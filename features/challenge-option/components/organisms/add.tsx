import { ChallengeOptionForm } from '../molecules/challenge-option-form';
  import { useChallengeOptionMutations } from '../../hooks/use-challenge-option';
  import { challengeOptionKeys } from '../../config/challenge-option.key';
  import { ChallengeOptionPayload } from '../../config/challenge-option.type';
  import { EntityForm } from '@/shared/components/molecules/form/add-entity';
  
  export function Add() {
    const { createChallengeOption, isCreating } = useChallengeOptionMutations();
  
    const handleSubmit = async (data: ChallengeOptionPayload) => {
      await createChallengeOption(data);
    };
  
    return (
      <EntityForm<ChallengeOptionPayload>
        title="ChallengeOption"
        initialData={null}
        onSubmit={handleSubmit}
        isSubmitting={isCreating}
        Form={ChallengeOptionForm}
        queryKey={challengeOptionKeys.all}
        mode="add"
      />
    );
  }