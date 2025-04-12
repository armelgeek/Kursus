import React from 'react';
import { getCourses } from '../../domain/use-cases';
import { getUserProgress } from '../../domain/use-cases/get-user-progress.use-case';
import { auth } from '@/auth';
import { headers } from 'next/headers';
import { List } from '../atoms/course-list';
const CourseSectionList = async () => {
     const session = await auth.api.getSession({ headers: await headers() });
        if (!session?.user) throw new Error("Unauthorized.");
        const userId = session.user.id || null;
  const coursesData = getCourses({
    sortDir: 'asc',
  });
  const userProgressData = getUserProgress(userId);

  const [courses, userProgress] = await Promise.all([
    coursesData,
    userProgressData,
  ]);
  console.log('courses.data',courses.data);

  return (
    <div className="mx-auto h-full max-w-[912px] px-3">
      <h1 className="text-2xl font-bold text-neutral-700">Language Courses</h1>

      <List courses={courses.data} activeCourseId={userProgress?.activeCourseId} />
    </div>
  );
};

export default CourseSectionList;
