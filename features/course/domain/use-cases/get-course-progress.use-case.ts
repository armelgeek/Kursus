import { cache } from "react";
import { getUserProgress } from "./get-user-progress.use-case";
import { challengeProgress, units } from "@/drizzle/schema";
import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";

/**
 * Récupère la progression du cours actif d'un utilisateur, y compris la première leçon non terminée.
 *
 * Cette fonction récupère la progression de l'utilisateur et détermine le cours actif en fonction
 * de l'ID du cours actif de l'utilisateur. Elle récupère ensuite toutes les unités et leçons du
 * cours actif, ordonnées par leur position respective. Pour chaque leçon, elle vérifie les défis
 * associés afin de trouver la première leçon contenant des défis non terminés.
 *
 * @param userId - L'identifiant unique de l'utilisateur dont la progression du cours est récupérée.
 * @returns Un objet contenant :
 * - `activeLesson` : La première leçon non terminée dans le cours actif, ou `null` si aucune n'est trouvée.
 * - `activeLessonId` : L'ID de la première leçon non terminée, ou `undefined` si aucune n'est trouvée.
 * Si l'utilisateur n'a pas de cours actif ou de progression, la fonction retourne `null`.
 */
export const getCourseProgress = cache(async (userId: string | null) => {
    const userProgress = await getUserProgress(userId);
  
    if (!userId || !userProgress?.activeCourseId) return null;
  
    const unitsInActiveCourse = await db.query.units.findMany({
      orderBy: (units, { asc }) => [asc(units.order)],
      where: eq(units.courseId, userProgress.activeCourseId),
      with: {
        lessons: {
          orderBy: (lessons, { asc }) => [asc(lessons.order)],
          with: {
            unit: true,
            challenges: {
              with: {
                challengeProgress: {
                  where: eq(challengeProgress.userId, userId),
                },
              },
            },
          },
        },
      },
    });
    const firstUncompletedLesson = unitsInActiveCourse
    .flatMap((unit) => unit.lessons)
    .find((lesson) => {
      return lesson.challenges.some((challenge) => {
        return (
          !challenge.challengeProgress ||
          challenge.challengeProgress.length === 0 ||
          challenge.challengeProgress.some((progress) => !progress.completed)
        );
      });
    });

  return {
    activeLesson: firstUncompletedLesson,
    activeLessonId: firstUncompletedLesson?.id,
  };
});