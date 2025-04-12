import { challengeOptionService } from '../domain/challenge-option.service';
import { ChallengeOption, ChallengeOptionPayload } from '../config/challenge-option.type';
import { Filter } from '@/shared/lib/types/filter';
import { useDetail, useList, useMutations } from '@/shared/lib/react-query/query-hooks';

export const CHALLENGE_OPTION_KEYS = {
  all: ['challengeOptions'] as const,
  lists: () => [...CHALLENGE_OPTION_KEYS.all, 'list'] as const,
  list: (filters: Filter) => [...CHALLENGE_OPTION_KEYS.lists(), { filters }] as const,
  details: () => [...CHALLENGE_OPTION_KEYS.all, 'detail'] as const,
  detail: (slug: string) => [...CHALLENGE_OPTION_KEYS.details(), slug] as const,
};

export const useChallengeOptions = (filters: Filter) => {
  return useList<ChallengeOption>(
    CHALLENGE_OPTION_KEYS,
    challengeOptionService,
    filters
  );
};

export const useChallengeOption = (slug: string) => {
  const { data, isLoading } = useDetail<ChallengeOption>(
    CHALLENGE_OPTION_KEYS,
    challengeOptionService,
    slug
  );

  return {
    challengeOption: data,
    isLoading,
  };
};

export const useChallengeOptionMutations = () => {

  const mutations = useMutations<ChallengeOption, ChallengeOptionPayload>({
    service: challengeOptionService,
    queryKeys: CHALLENGE_OPTION_KEYS,
    successMessages: {
      create: 'ChallengeOption created successfully',
      update: 'ChallengeOption updated successfully',
      delete: 'ChallengeOption deleted successfully'
    },
    callbacks: {
      onCreateSuccess: () => {
     
      }
    }
  });

  return {
    createChallengeOption: mutations.create,
    updateChallengeOption: mutations.update,
    deleteChallengeOption: mutations.remove,
    isCreating: mutations.isCreating,
    isUpdating: mutations.isUpdating,
    isDeleting: mutations.isDeleting,
  };
};
