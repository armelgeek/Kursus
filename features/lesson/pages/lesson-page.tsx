import React from 'react'
import { redirect } from 'next/navigation'
import { getCourseProgress } from '@/features/course/domain/use-cases/get-course-progress.use-case';
import { getLessonPercentage } from '@/features/course/domain/use-cases/get-lesson-percent.use-case';
import { getUserProgress } from '@/features/course/domain/use-cases/get-user-progress.use-case';
import { StickyWrapper } from '@/shared/components/atoms/sticky-wrapper';
import { UserProgress } from '@/shared/components/molecules/user-progress';
import { auth } from '@/auth';
import { headers } from 'next/headers';
import { Quests } from '@/features/course/components/molecules/quests';
import { FeedWrapper } from '@/shared/components/atoms/feed-wrapper';
import { Unit } from '@/features/unit/components/molecules/unit';
import { getUnits } from '../../course/domain/use-cases/get-units.use-case';
import { LearnHeader } from '../components/molecules/learn-header';


export default async function LessonPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id || null;
  const userProgressData = getUserProgress(userId);
  const courseProgressData = getCourseProgress(userId);
  const lessonPercentageData = getLessonPercentage(userId);
  const unitsData = getUnits(userId);
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
  console.log('courseProgress',courseProgress);
  
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
        <Quests points={userProgress.points} />
      

      </StickyWrapper>
      <FeedWrapper>
        <LearnHeader title={userProgress.activeCourse.title}/>
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              activeLesson={courseProgress.activeLesson}
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
        </FeedWrapper>
       

    </div>
  )
}
