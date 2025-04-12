import { ChallengeForm } from '../molecules/challenge-form';
  import { useChallengeMutations } from '../../hooks/use-challenge';
  import { challengeKeys } from '../../config/challenge.key';
  import { ChallengePayload } from '../../config/challenge.type';
  import { EntityForm } from '@/shared/components/molecules/form/add-entity';
  
  export function Add() {
    const { createChallenge, isCreating } = useChallengeMutations();
  
    const handleSubmit = async (data: ChallengePayload) => {
      await createChallenge(data);
    };
  
    return (
      <EntityForm<ChallengePayload>
        title="Challenge"
        initialData={null}
        onSubmit={handleSubmit}
        isSubmitting={isCreating}
        Form={ChallengeForm}
        queryKey={challengeKeys.all}
        mode="add"
      />
    );
  }