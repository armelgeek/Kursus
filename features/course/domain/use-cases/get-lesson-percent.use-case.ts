import { cache } from "react";
import { getCourseProgress } from "./get-course-progress.use-case";
import { getLesson } from "./get-lesson.use-case";

export const getLessonPercentage = cache(async (userId: string | null) => {
    const courseProgress = await getCourseProgress(userId);
  
    if (!courseProgress?.activeLessonId) return 0;
  
    const lesson = await getLesson(userId,courseProgress?.activeLessonId);
  
    if (!lesson) return 0;
  
    const completedChallenges = lesson.challenges.filter(
      (challenge) => challenge.completed
    );
  
    const percentage = Math.round(
      (completedChallenges.length / lesson.challenges.length) * 100
    );
  
    return percentage;
  });