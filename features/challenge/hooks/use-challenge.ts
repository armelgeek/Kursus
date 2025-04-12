import { challengeService } from '../domain/challenge.service';
import { Challenge, ChallengePayload } from '../config/challenge.type';
import { Filter } from '@/shared/lib/types/filter';
import { useDetail, useList, useMutations } from '@/shared/lib/react-query/query-hooks';

export const CHALLENGE_KEYS = {
  all: ['challenges'] as const,
  lists: () => [...CHALLENGE_KEYS.all, 'list'] as const,
  list: (filters: Filter) => [...CHALLENGE_KEYS.lists(), { filters }] as const,
  details: () => [...CHALLENGE_KEYS.all, 'detail'] as const,
  detail: (slug: string) => [...CHALLENGE_KEYS.details(), slug] as const,
};

export const useChallenges = (filters: Filter) => {
  return useList<Challenge>(
    CHALLENGE_KEYS,
    challengeService,
    filters
  );
};

export const useChallenge = (slug: string) => {
  const { data, isLoading } = useDetail<Challenge>(
    CHALLENGE_KEYS,
    challengeService,
    slug
  );

  return {
    challenge: data,
    isLoading,
  };
};

export const useChallengeMutations = () => {

  const mutations = useMutations<Challenge, ChallengePayload>({
    service: challengeService,
    queryKeys: CHALLENGE_KEYS,
    successMessages: {
      create: 'Challenge created successfully',
      update: 'Challenge updated successfully',
      delete: 'Challenge deleted successfully'
    },
    callbacks: {
      onCreateSuccess: () => {
     
      }
    }
  });

  return {
    createChallenge: mutations.create,
    updateChallenge: mutations.update,
    deleteChallenge: mutations.remove,
    isCreating: mutations.isCreating,
    isUpdating: mutations.isUpdating,
    isDeleting: mutations.isDeleting,
  };
};
