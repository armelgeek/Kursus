import { lessonService } from '../domain/lesson.service';
import { Lesson, LessonPayload } from '../config/lesson.type';
import { Filter } from '@/shared/lib/types/filter';
import { useDetail, useList, useMutations } from '@/shared/lib/react-query/query-hooks';

export const LESSON_KEYS = {
  all: ['lessons'] as const,
  lists: () => [...LESSON_KEYS.all, 'list'] as const,
  list: (filters: Filter) => [...LESSON_KEYS.lists(), { filters }] as const,
  details: () => [...LESSON_KEYS.all, 'detail'] as const,
  detail: (slug: string) => [...LESSON_KEYS.details(), slug] as const,
};

export const useLessons = (filters: Filter) => {
  return useList<Lesson>(
    LESSON_KEYS,
    lessonService,
    filters
  );
};

export const useLesson = (slug: string) => {
  const { data, isLoading } = useDetail<Lesson>(
    LESSON_KEYS,
    lessonService,
    slug
  );

  return {
    lesson: data,
    isLoading,
  };
};

export const useLessonMutations = () => {

  const mutations = useMutations<Lesson, LessonPayload>({
    service: lessonService,
    queryKeys: LESSON_KEYS,
    successMessages: {
      create: 'Lesson created successfully',
      update: 'Lesson updated successfully',
      delete: 'Lesson deleted successfully'
    },
    callbacks: {
      onCreateSuccess: () => {
     
      }
    }
  });

  return {
    createLesson: mutations.create,
    updateLesson: mutations.update,
    deleteLesson: mutations.remove,
    isCreating: mutations.isCreating,
    isUpdating: mutations.isUpdating,
    isDeleting: mutations.isDeleting,
  };
};
