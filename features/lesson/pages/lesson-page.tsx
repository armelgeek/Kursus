import React from 'react'
import { redirect } from 'next/navigation'
import { getCourseProgress } from '@/features/course/domain/use-cases/get-course-progress.use-case';
import { getLessonPercentage } from '@/features/course/domain/use-cases/get-lesson-percent.use-case';
import { getUserProgress } from '@/features/course/domain/use-cases/get-user-progress.use-case';
import { getUnits } from '@/features/unit/domain/use-cases';
import { StickyWrapper } from '@/shared/components/atoms/sticky-wrapper';
import { UserProgress } from '@/shared/components/molecules/user-progress';
import { auth } from '@/auth';
import { headers } from 'next/headers';


export default async function LessonPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
      });
    const userId = session?.user?.id || null;
    const userProgressData = getUserProgress(userId);
    const courseProgressData = getCourseProgress(userId);
    const lessonPercentageData = getLessonPercentage(userId);
    const unitsData = getUnits({
        sortDir: 'esc',
    });
  
    const [
      userProgress,
      units,
      courseProgress,
      lessonPercentage,
    ] = await Promise.all([
      userProgressData,
      unitsData,
      courseProgressData,
      lessonPercentageData
    ]);
  
    if (!courseProgress || !userProgress || !userProgress.activeCourse)
      redirect("/courses");
  
   
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
    <StickyWrapper>
      <UserProgress
        activeCourse={userProgress.activeCourse}
        hearts={userProgress.hearts}
        points={userProgress.points}
      />
    </StickyWrapper>
        
    </div>
  )
}
