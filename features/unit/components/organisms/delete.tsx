'use client';
  
  import { useUnitMutations } from '../../hooks/use-unit';
  import { EntityDelete } from '@/shared/components/molecules/table/entity-delete';
  import { unitKeys } from '../../config/unit.key';
  
  interface DeleteProps {
    slug: string;
    onComplete?: () => void;
  }
  
  export function Delete({ slug, onComplete }: DeleteProps) {
    const { deleteUnit } = useUnitMutations();
  
    return (
      <EntityDelete
        entityId={slug}
        entityName="Unit"
        deleteService={async (id: string) => await deleteUnit(id)}
        queryKey={unitKeys.all}
        onActionComplete={onComplete}
      />
    );
  }