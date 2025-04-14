"use server";

import { auth } from "@/auth";
import { db } from "@/drizzle/db";
import { challengeProgress, chapterProgress, chapters, userProgress } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { challenges } from '@/drizzle/schema/challenge';
import { getUserProgress } from "@/features/course/domain/use-cases/get-user-progress.use-case";


/**
 * Récupère un chapitre et son contenu par ID
 */
export const getChapterById = async (chapterId: number) => {
   const session = await auth.api.getSession({
         headers: await headers(),
     });
     const userId = session?.user.id || null;
  if (!userId) throw new Error("Unauthorized.");

  const chapter = await db.query.chapters.findFirst({
    where: eq(chapters.id, chapterId),
    with: {
      lesson: true,
    }
  });

  if (!chapter) throw new Error("Chapter not found.");

  return chapter;
};

/**
 * Récupère tous les chapitres d'une leçon
 */
export const getChaptersByLessonId = async (lessonId: number) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const userId = session?.user.id || null;
  if (!userId) throw new Error("Unauthorized.");

  const chaptersData = await db.query.chapters.findMany({
    where: eq(chapters.lessonId, lessonId),
    orderBy: (chapters, { asc }) => [asc(chapters.order)],
    with: {
      chapterProgress: {
        where: eq(chapterProgress.userId, userId),
      },
    },
  });

  if (!chaptersData) return [];

  return chaptersData;
};

/**
 * Récupère la progression d'un utilisateur pour un chapitre spécifique
 */
export const getChapterProgress = async (chapterId: number) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const userId = session?.user.id || null;
  if (!userId) throw new Error("Unauthorized.");

  const progress = await db.query.chapterProgress.findFirst({
    where: and(
      eq(chapterProgress.userId, userId),
      eq(chapterProgress.chapterId, chapterId)
    )
  });

  return progress;
};

/**
 * Marque un chapitre comme lu ou met à jour la position de lecture
 */
export const upsertChapterProgress = async (
  chapterId: number, 
  completed: boolean = false, 
  readingPosition: number = 0
) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const userId = session?.user.id || null;
  if (!userId) throw new Error("Unauthorized.");

  const chapter = await db.query.chapters.findFirst({
    where: eq(chapters.id, chapterId),
  });

  if (!chapter) throw new Error("Chapter not found.");

  const lessonId = chapter.lessonId;
  const existingProgress = await db.query.chapterProgress.findFirst({
    where: and(
      eq(chapterProgress.userId, userId),
      eq(chapterProgress.chapterId, chapterId)
    ),
  });

  if (existingProgress) {
    // Mise à jour de la progression existante
    await db
      .update(chapterProgress)
      .set({
        completed: completed || existingProgress.completed,
        readingPosition: readingPosition !== 0 ? readingPosition : existingProgress.readingPosition,
        lastRead: new Date(),
      })
      .where(eq(chapterProgress.id, existingProgress.id));
  } else {
    // Création d'une nouvelle progression
    await db.insert(chapterProgress).values({
      chapterId,
      userId,
      completed,
      readingPosition,
      lastRead: new Date(),
    });
  }

  // Mise à jour des points de l'utilisateur lors de la première complétion
  if (completed && (!existingProgress || !existingProgress.completed)) {
    const currentUserProgress = await getUserProgress(userId);
    
    if (currentUserProgress) {
      await db
        .update(userProgress)
        .set({
          points: currentUserProgress.points + 5, // Points pour avoir terminé un chapitre
        })
        .where(eq(userProgress.userId, userId));
    }
  }

  revalidatePath("/");
  revalidatePath("/lesson");
  revalidatePath(`/lesson/${lessonId}`);
  revalidatePath(`/chapter/${chapterId}`);
};

/**
 * Vérifie si tous les chapitres d'une leçon sont complétés
 */
export const checkLessonCompletion = async (lessonId: number) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const userId = session?.user.id || null;
  if (!userId) throw new Error("Unauthorized.");

  // Récupère tous les chapitres de la leçon
  const lessonChapters = await db.query.chapters.findMany({
    where: eq(chapters.lessonId, lessonId),
  });

  if (lessonChapters.length === 0) return false;

  // Récupère la progression de tous les chapitres pour cet utilisateur
  const chaptersProgressions = await Promise.all(
    lessonChapters.map(async (chapter) => {
      const progress = await db.query.chapterProgress.findFirst({
        where: and(
          eq(chapterProgress.userId, userId),
          eq(chapterProgress.chapterId, chapter.id)
        ),
      });
      
      return progress?.completed || false;
    })
  );

  // Vérifie si tous les chapitres sont complétés
  return chaptersProgressions.every(isCompleted => isCompleted === true);
};

/**
 * Récupère les quiz/challenges associés à un chapitre
 */
export const getChapterChallenges = async (chapterId: number) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const userId = session?.user.id || null;
  if (!userId) throw new Error("Unauthorized.");

  const chapterChallenges = await db.query.challenges.findMany({
    where: eq(challenges.associatedChapterId, chapterId),
    orderBy: (challenges, { asc }) => [asc(challenges.order)],
    with: {
      challengeOptions: true,
      challengeProgress: {
        where: eq(challengeProgress.userId, userId),
      },
    },
  });

  return chapterChallenges;
};

/**
 * Complète un challenge (quiz) associé à un chapitre
 */
export const upsertChapterChallengeProgress = async (challengeId: number) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const userId = session?.user.id || null;
  if (!userId) throw new Error("Unauthorized.");

  const currentUserProgress = await getUserProgress(userId);

  if (!currentUserProgress) throw new Error("User progress not found.");

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId)
  });

  if (!challenge) throw new Error("Challenge not found.");
  
  const chapterId = challenge.associatedChapterId;

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId)
    ),
  });

  const isPractice = !!existingChallengeProgress;

  // Si c'est une pratique (déjà complété), mettre à jour et ajouter des points bonus
  if (isPractice) {
    await db
      .update(challengeProgress)
      .set({
        completed: true,
      })
      .where(eq(challengeProgress.id, existingChallengeProgress.id));
    
    // Points bonus pour la pratique
    await db
      .update(userProgress)
      .set({
        points: currentUserProgress.points + 5,
      })
      .where(eq(userProgress.userId, userId));
      
    revalidatePath("/");
    revalidatePath("/lesson");
   // revalidatePath(`/lesson/${lessonId}`);
    revalidatePath(`/chapter/${chapterId}`);
    return;
  }

  // Première complétion du challenge
  await db.insert(challengeProgress).values({
    challengeId,
    userId,
    completed: true,
  });

  // Ajouter des points pour avoir terminé un nouveau challenge
  await db
    .update(userProgress)
    .set({
      points: currentUserProgress.points + 10,
    })
    .where(eq(userProgress.userId, userId));
  
  // Vérifier si tous les challenges du chapitre sont complétés
  const allChallenges = await db.query.challenges.findMany({
    where: eq(challenges.associatedChapterId, chapterId),
  });
  
  const allChallengesProgress = await Promise.all(
    allChallenges.map(async (ch) => {
      const progress = await db.query.challengeProgress.findFirst({
        where: and(
          eq(challengeProgress.userId, userId),
          eq(challengeProgress.challengeId, ch.id)
        ),
      });
      
      return progress?.completed || false;
    })
  );
  
  // Si tous les challenges sont complétés, marquer automatiquement le chapitre comme complété
  if (allChallengesProgress.every(isCompleted => isCompleted === true)) {
    await upsertChapterProgress(chapterId, true);
  }

  revalidatePath("/");
  revalidatePath("/lesson");
 // revalidatePath(`/lesson/${lessonId}`);
  revalidatePath(`/chapter/${chapterId}`);
};

/**
 * Vérifie si un chapitre est déverrouillé pour l'utilisateur
 * (basé sur la complétion du chapitre précédent)
 */
export const isChapterUnlocked = async (chapterId: number) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const userId = session?.user.id || null;
  if (!userId) return false;

  const chapter = await db.query.chapters.findFirst({
    where: eq(chapters.id, chapterId),
  });

  if (!chapter) return false;

  // Le premier chapitre d'une leçon est toujours déverrouillé
  if (chapter.order === 1) return true;

  // Pour les autres chapitres, vérifier si le chapitre précédent est complété
  const previousChapter = await db.query.chapters.findFirst({
    where: and(
      eq(chapters.lessonId, chapter.lessonId),
      eq(chapters.order, chapter.order - 1)
    ),
  });

  if (!previousChapter) return true; // Si pas de chapitre précédent, déverrouiller

  // Vérifier si le chapitre précédent est complété
  const previousChapterProgress = await db.query.chapterProgress.findFirst({
    where: and(
      eq(chapterProgress.userId, userId),
      eq(chapterProgress.chapterId, previousChapter.id)
    ),
  });

  return !!previousChapterProgress?.completed;
};