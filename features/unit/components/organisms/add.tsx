import { UnitForm } from '../molecules/unit-form';
  import { useUnitMutations } from '../../hooks/use-unit';
  import { unitKeys } from '../../config/unit.key';
  import { UnitPayload } from '../../config/unit.type';
  import { EntityForm } from '@/shared/components/molecules/form/add-entity';
  
  export function Add() {
    const { createUnit, isCreating } = useUnitMutations();
  
    const handleSubmit = async (data: UnitPayload) => {
      await createUnit(data);
    };
  
    return (
      <EntityForm<UnitPayload>
        title="Unit"
        initialData={null}
        onSubmit={handleSubmit}
        isSubmitting={isCreating}
        Form={UnitForm}
        queryKey={unitKeys.all}
        mode="add"
      />
    );
  }