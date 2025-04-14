import { chapterService } from '../domain/chapter.service';
import { Chapter, ChapterPayload } from '../config/chapter.type';
import { Filter } from '@/shared/lib/types/filter';
import { useDetail, useList, useMutations } from '@/shared/lib/react-query/query-hooks';

export const CHAPTER_KEYS = {
  all: ['chapters'] as const,
  lists: () => [...CHAPTER_KEYS.all, 'list'] as const,
  list: (filters: Filter) => [...CHAPTER_KEYS.lists(), { filters }] as const,
  details: () => [...CHAPTER_KEYS.all, 'detail'] as const,
  detail: (slug: string) => [...CHAPTER_KEYS.details(), slug] as const,
};

export const useChapters = (filters: Filter) => {
  return useList<Chapter>(
    CHAPTER_KEYS,
    chapterService,
    filters
  );
};

export const useChapter = (slug: string) => {
  const { data, isLoading } = useDetail<Chapter>(
    CHAPTER_KEYS,
    chapterService,
    slug
  );

  return {
    chapter: data,
    isLoading,
  };
};

export const useChapterMutations = () => {

  const mutations = useMutations<Chapter, ChapterPayload>({
    service: chapterService,
    queryKeys: CHAPTER_KEYS,
    successMessages: {
      create: 'Chapter created successfully',
      update: 'Chapter updated successfully',
      delete: 'Chapter deleted successfully'
    },
    callbacks: {
      onCreateSuccess: () => {
     
      }
    }
  });

  return {
    createChapter: mutations.create,
    updateChapter: mutations.update,
    deleteChapter: mutations.remove,
    isCreating: mutations.isCreating,
    isUpdating: mutations.isUpdating,
    isDeleting: mutations.isDeleting,
  };
};
