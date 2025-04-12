'use client';
  
  import { EntityForm } from '@/shared/components/molecules/form/add-entity';
  import { ChallengeOptionPayload } from '../../config/challenge-option.type';
  import { ChallengeOptionForm } from '../molecules/challenge-option-form';
  import { challengeOptionKeys } from '../../config/challenge-option.key';
  import { useChallengeOption, useChallengeOptionMutations } from '../../hooks/use-challenge-option';
  
  interface EditProps {
    slug: string;
    onComplete?: () => void;
  }
  
  export function Edit({ slug, onComplete }: EditProps) {
    const { challengeOption } = useChallengeOption(slug);
    const { updateChallengeOption, isUpdating } = useChallengeOptionMutations();
  
    const handleSubmit = async (data: ChallengeOptionPayload) => {
      await updateChallengeOption({ slug, data });
      onComplete?.();
    };
  
    if (!challengeOption) {
      return null;
    }
  
    return (
      <EntityForm<ChallengeOptionPayload>
        title="ChallengeOption"
        initialData={challengeOption}
        onSubmit={handleSubmit}
        isSubmitting={isUpdating}
        Form={ChallengeOptionForm}
        queryKey={challengeOptionKeys.all}
        mode="edit"
      />
    );
  }