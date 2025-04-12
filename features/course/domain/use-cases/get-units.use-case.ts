import { cache } from "react";
import { getUserProgress } from "./get-user-progress.use-case";
import { db } from "@/drizzle/db";
import { challengeProgress, units } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

/**
 * Récupère les unités d'un cours actif pour un utilisateur donné, en incluant les leçons,
 * les défis et leur progression. Les données sont normalisées pour inclure un indicateur
 * de complétion pour chaque leçon.
 *
 * @param userId - L'identifiant de l'utilisateur pour lequel récupérer les unités.
 * @returns Une promesse qui résout en une liste d'unités normalisées, chaque unité contenant
 *          des leçons avec un statut de complétion.
 *
 * ### Détails :
 * - Si `userId` est invalide ou si l'utilisateur n'a pas de cours actif, retourne une liste vide.
 * - Les unités sont triées par ordre croissant (`units.order`).
 * - Chaque unité contient des leçons triées par ordre croissant (`lessons.order`).
 * - Chaque leçon contient des défis triés par ordre croissant (`challenges.order`).
 * - La progression des défis est filtrée pour l'utilisateur donné.
 * - Une leçon est marquée comme complétée si tous ses défis sont complétés.
 *
 */
export const getUnits = cache(async (userId: string) => {
    const userProgress = await getUserProgress(userId);

    if (!userId || !userProgress?.activeCourseId) return [];

    const data = await db.query.units.findMany({
        where: eq(units.courseId, userProgress.activeCourseId),
        orderBy: (units, { asc }) => [asc(units.order)],
        with: {
            lessons: {
                orderBy: (lessons, { asc }) => [asc(lessons.order)],
                with: {
                    challenges: {
                        orderBy: (challenges, { asc }) => [asc(challenges.order)],
                        with: {
                            challengeProgress: {
                                where: eq(challengeProgress.userId, userId),
                            },
                        },
                    },
                },
            },
        },
    })
    const normalizedData = data.map((unit) => {
        const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
            if (lesson.challenges.length === 0)
                return { ...lesson, completed: false };

            const allCompletedChallenges = lesson.challenges.every((challenge) => {
                return (
                    challenge.challengeProgress &&
                    challenge.challengeProgress.length > 0 &&
                    challenge.challengeProgress.every((progress) => progress.completed)
                );
            });

            return { ...lesson, completed: allCompletedChallenges };
        });

        return { ...unit, lessons: lessonsWithCompletedStatus };
    });

    return normalizedData;
});