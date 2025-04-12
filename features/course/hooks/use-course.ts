import { courseService } from '../domain/course.service';
import { Course, CoursePayload } from '../config/course.type';
import { Filter } from '@/shared/lib/types/filter';
import { useDetail, useList, useMutations } from '@/shared/lib/react-query/query-hooks';

export const COURSE_KEYS = {
  all: ['courses'] as const,
  lists: () => [...COURSE_KEYS.all, 'list'] as const,
  list: (filters: Filter) => [...COURSE_KEYS.lists(), { filters }] as const,
  details: () => [...COURSE_KEYS.all, 'detail'] as const,
  detail: (slug: string) => [...COURSE_KEYS.details(), slug] as const,
};

export const useCourses = (filters: Filter) => {
  return useList<Course>(
    COURSE_KEYS,
    courseService,
    filters
  );
};

export const useCourse = (slug: string) => {
  const { data, isLoading } = useDetail<Course>(
    COURSE_KEYS,
    courseService,
    slug
  );

  return {
    course: data,
    isLoading,
  };
};

export const useCourseMutations = () => {

  const mutations = useMutations<Course, CoursePayload>({
    service: courseService,
    queryKeys: COURSE_KEYS,
    successMessages: {
      create: 'Course created successfully',
      update: 'Course updated successfully',
      delete: 'Course deleted successfully'
    },
    callbacks: {
      onCreateSuccess: () => {
     
      }
    }
  });

  return {
    createCourse: mutations.create,
    updateCourse: mutations.update,
    deleteCourse: mutations.remove,
    isCreating: mutations.isCreating,
    isUpdating: mutations.isUpdating,
    isDeleting: mutations.isDeleting,
  };
};
