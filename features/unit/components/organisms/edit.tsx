'use client';
  
  import { EntityForm } from '@/shared/components/molecules/form/add-entity';
  import { UnitPayload } from '../../config/unit.type';
  import { UnitForm } from '../molecules/unit-form';
  import { unitKeys } from '../../config/unit.key';
  import { useUnit, useUnitMutations } from '../../hooks/use-unit';
  
  interface EditProps {
    slug: string;
    onComplete?: () => void;
  }
  
  export function Edit({ slug, onComplete }: EditProps) {
    const { unit } = useUnit(slug);
    const { updateUnit, isUpdating } = useUnitMutations();
  
    const handleSubmit = async (data: UnitPayload) => {
      await updateUnit({ slug, data });
      onComplete?.();
    };
  
    if (!unit) {
      return null;
    }
  
    return (
      <EntityForm<UnitPayload>
        title="Unit"
        initialData={unit}
        onSubmit={handleSubmit}
        isSubmitting={isUpdating}
        Form={UnitForm}
        queryKey={unitKeys.all}
        mode="edit"
      />
    );
  }