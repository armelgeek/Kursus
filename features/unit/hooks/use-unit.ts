import { unitService } from '../domain/unit.service';
import { Unit, UnitPayload } from '../config/unit.type';
import { Filter } from '@/shared/lib/types/filter';
import { useDetail, useList, useMutations } from '@/shared/lib/react-query/query-hooks';

export const UNIT_KEYS = {
  all: ['units'] as const,
  lists: () => [...UNIT_KEYS.all, 'list'] as const,
  list: (filters: Filter) => [...UNIT_KEYS.lists(), { filters }] as const,
  details: () => [...UNIT_KEYS.all, 'detail'] as const,
  detail: (slug: string) => [...UNIT_KEYS.details(), slug] as const,
};

export const useUnits = (filters: Filter) => {
  return useList<Unit>(
    UNIT_KEYS,
    unitService,
    filters
  );
};

export const useUnit = (slug: string) => {
  const { data, isLoading } = useDetail<Unit>(
    UNIT_KEYS,
    unitService,
    slug
  );

  return {
    unit: data,
    isLoading,
  };
};

export const useUnitMutations = () => {

  const mutations = useMutations<Unit, UnitPayload>({
    service: unitService,
    queryKeys: UNIT_KEYS,
    successMessages: {
      create: 'Unit created successfully',
      update: 'Unit updated successfully',
      delete: 'Unit deleted successfully'
    },
    callbacks: {
      onCreateSuccess: () => {
     
      }
    }
  });

  return {
    createUnit: mutations.create,
    updateUnit: mutations.update,
    deleteUnit: mutations.remove,
    isCreating: mutations.isCreating,
    isUpdating: mutations.isUpdating,
    isDeleting: mutations.isDeleting,
  };
};
