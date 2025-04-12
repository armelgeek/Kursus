'use client';
  
  import { useChallengeOptionMutations } from '../../hooks/use-challenge-option';
  import { EntityDelete } from '@/shared/components/molecules/table/entity-delete';
  import { challengeOptionKeys } from '../../config/challenge-option.key';
  
  interface DeleteProps {
    slug: string;
    onComplete?: () => void;
  }
  
  export function Delete({ slug, onComplete }: DeleteProps) {
    const { deleteChallengeOption } = useChallengeOptionMutations();
  
    return (
      <EntityDelete
        entityId={slug}
        entityName="ChallengeOption"
        deleteService={async (id: string) => await deleteChallengeOption(id)}
        queryKey={challengeOptionKeys.all}
        onActionComplete={onComplete}
      />
    );
  }