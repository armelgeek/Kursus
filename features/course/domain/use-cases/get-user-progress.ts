"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getCourseById } from "./get-course-by-id.use-case";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { getUserProgress } from "./get-user-progress.use-case";
import { db } from "@/drizzle/db";
import { challengeProgress, challenges, userProgress } from "@/drizzle/schema";
import { MAX_HEARTS, POINTS_TO_REFILL } from "@/shared/lib/constants/app.constant";


export const upsertUserProgress = async (courseId: number) => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) throw new Error("Non autorisé.");
    const userId = session.user.id;
    if (!userId) throw new Error("L'ID utilisateur est null.");
    
    const course = await getCourseById(courseId);

    if (!course) throw new Error("Cours non trouvé.");

    if (!course.units.length || !course.units[0].lessons.length)
        throw new Error("Le cours est vide.");

    const existingUserProgress = await getUserProgress(userId);

    if (existingUserProgress) {
        // Si la progression de l'utilisateur existe, on la met à jour
        await db
            .update(userProgress)
            .set({
                activeCourseId: courseId,
                userName: session?.user.name || "Utilisateur",
                userImageSrc: "/mascot.svg",
            })
            .where(eq(userProgress.userId, userId));
    } else {
        // Si la progression de l'utilisateur n'existe pas, on l'insère
        try {
            await db.insert(userProgress).values({
                userId,
                activeCourseId: courseId,
                userName: session?.user.name || "Utilisateur",
                userImageSrc: "/mascot.svg",
            });
        } catch (error: any) {
            if (error.message.includes("unique constraint")) {
                throw new Error("Entrée dupliquée pour la progression de l'utilisateur.");
            }
            throw error;
        }
    }

    revalidatePath("/courses");
    revalidatePath("/");
};
export const reduceHearts = async (challengeId: number) => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) throw new Error("Unauthorized.");
    const userId = session.user.id || null;

    if (!userId) throw new Error("Unauthorized.");

    const currentUserProgress = await getUserProgress(userId);

    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId),
    });

    if (!challenge) throw new Error("Challenge not found.");

    const lessonId = challenge.lessonId;

    const existingChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(
            eq(challengeProgress.userId, userId),
            eq(challengeProgress.challengeId, challengeId)
        ),
    });

    const isPractice = !!existingChallengeProgress;

    if (isPractice) return { error: "practice" };

    if (!currentUserProgress) throw new Error("User progress not found.");
    if (currentUserProgress.hearts === 0) return { error: "hearts" };

    await db
        .update(userProgress)
        .set({
            hearts: Math.max(currentUserProgress.hearts - 1, 0),
        })
        .where(eq(userProgress.userId, userId));

    revalidatePath("/shop");
    revalidatePath("/");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    revalidatePath(`/lesson/${lessonId}`);
};

export const refillHearts = async () => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) throw new Error("Unauthorized.");
    const userId = session.user.id || null;
    const currentUserProgress = await getUserProgress(userId);

    if (!currentUserProgress) throw new Error("User progress not found.");
    if (currentUserProgress.hearts === MAX_HEARTS)
        throw new Error("Hearts are already full.");
    if (currentUserProgress.points < POINTS_TO_REFILL)
        throw new Error("Not enough points.");

    await db
        .update(userProgress)
        .set({
            hearts: MAX_HEARTS,
            points: currentUserProgress.points - POINTS_TO_REFILL,
        })
        .where(eq(userProgress.userId, currentUserProgress.userId));

    revalidatePath("/shop");
    revalidatePath("/");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
};
