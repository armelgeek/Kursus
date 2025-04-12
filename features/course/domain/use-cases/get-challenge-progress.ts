"use server";

import { auth } from "@/auth";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getUserProgress } from "./get-user-progress.use-case";
import { headers } from "next/headers";
import { challengeProgress, challenges, userProgress } from "@/drizzle/schema";
import { db } from "@/drizzle/db";
import { MAX_HEARTS } from "@/shared/lib/constants/app.constant";


export const upsertChallengeProgress = async (challengeId: number) => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) throw new Error("Unauthorized.");
    const userId = session.user.id || null;
    const currentUserProgress = await getUserProgress(userId);

    if (!currentUserProgress) throw new Error("User progress not found.");

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

    if (
        currentUserProgress.hearts === 0 &&
        !isPractice
    )
        return { error: "hearts" };

    if (isPractice) {
        await db
            .update(challengeProgress)
            .set({
                completed: true,
            })
            .where(eq(challengeProgress.id, existingChallengeProgress.id));

        await db
            .update(userProgress)
            .set({
                hearts: Math.min(currentUserProgress.hearts + 1, MAX_HEARTS),
                points: currentUserProgress.points + 10,
            })
            .where(eq(userProgress.userId, userId));

        revalidatePath("/");
        revalidatePath("/lesson");
        revalidatePath("/quests");
        revalidatePath("/leaderboard");
        revalidatePath(`/lesson/${lessonId}`);
        return;
    }

    await db.insert(challengeProgress).values({
        challengeId,
        userId,
        completed: true,
    });

    await db
        .update(userProgress)
        .set({
            points: currentUserProgress.points + 10,
        })
        .where(eq(userProgress.userId, userId));

    revalidatePath("/");
    revalidatePath("/lesson");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    revalidatePath(`/lesson/${lessonId}`);
};
