'use client';
  
  import { useChallengeMutations } from '../../hooks/use-challenge';
  import { EntityDelete } from '@/shared/components/molecules/table/entity-delete';
  import { challengeKeys } from '../../config/challenge.key';
  
  interface DeleteProps {
    slug: string;
    onComplete?: () => void;
  }
  
  export function Delete({ slug, onComplete }: DeleteProps) {
    const { deleteChallenge } = useChallengeMutations();
  
    return (
      <EntityDelete
        entityId={slug}
        entityName="Challenge"
        deleteService={async (id: string) => await deleteChallenge(id)}
        queryKey={challengeKeys.all}
        onActionComplete={onComplete}
      />
    );
  }