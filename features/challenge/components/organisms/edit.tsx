'use client';
  
  import { EntityForm } from '@/shared/components/molecules/form/add-entity';
  import { ChallengePayload } from '../../config/challenge.type';
  import { ChallengeForm } from '../molecules/challenge-form';
  import { challengeKeys } from '../../config/challenge.key';
  import { useChallenge, useChallengeMutations } from '../../hooks/use-challenge';
  
  interface EditProps {
    slug: string;
    onComplete?: () => void;
  }
  
  export function Edit({ slug, onComplete }: EditProps) {
    const { challenge } = useChallenge(slug);
    const { updateChallenge, isUpdating } = useChallengeMutations();
  
    const handleSubmit = async (data: ChallengePayload) => {
      await updateChallenge({ slug, data });
      onComplete?.();
    };
  
    if (!challenge) {
      return null;
    }
  
    return (
      <EntityForm<ChallengePayload>
        title="Challenge"
        initialData={challenge}
        onSubmit={handleSubmit}
        isSubmitting={isUpdating}
        Form={ChallengeForm}
        queryKey={challengeKeys.all}
        mode="edit"
      />
    );
  }