import { cache } from "react";
import { getCourseProgress } from "./get-course-progress.use-case";
import { db } from "@/drizzle/db";
import { lessons } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { challengeProgress } from "@/drizzle/schema/schema";

/**
 * Récupère une leçon et ses défis associés pour un utilisateur donné.
 * 
 * Cette fonction récupère les données de la leçon en fonction de l'`userId` fourni et d'un `id` optionnel.
 * Si aucun `id` n'est fourni, elle utilise par défaut l'ID de la leçon active à partir de la progression
 * du cours de l'utilisateur. Les données de la leçon incluent ses défis, qui sont normalisés pour inclure
 * un statut `completed` indiquant si tous les progrès pour le défi ont été complétés par l'utilisateur.
 * 
 * @param userId - L'identifiant unique de l'utilisateur. Si non fourni, la fonction retourne `null`.
 * @param id - (Optionnel) L'ID de la leçon à récupérer. Si non fourni, l'ID de la leçon active
 *             à partir de la progression du cours de l'utilisateur est utilisé.
 * 
 * @returns Une promesse qui résout les données de la leçon avec des défis normalisés, ou `null` si
 *          la leçon ou les données de l'utilisateur ne sont pas trouvées.
 *
 */
export const getLesson = cache(async (userId: string, id?: number) => {
    if (!userId) return null;

    const courseProgress = await getCourseProgress(userId);
    const lessonId = id || courseProgress?.activeLessonId;

    if (!lessonId) return null;

    const data = await db.query.lessons.findFirst({
        where: eq(lessons.id, lessonId),
        with: {
            challenges: {
                orderBy: (challenges, { asc }) => [asc(challenges.order)],
                with: {
                    challengeOptions: true,
                    challengeProgress: {
                        where: eq(challengeProgress.userId, userId),
                    },
                },
            },
        },
    });

    if (!data || !data.challenges) return null;

    const normalizedChallenges = data.challenges.map((challenge) => {
        const completed =
            challenge.challengeProgress &&
            challenge.challengeProgress.length > 0 &&
            challenge.challengeProgress.every((progress) => progress.completed);

        return { ...challenge, completed };
    });

    return { ...data, challenges: normalizedChallenges };
});