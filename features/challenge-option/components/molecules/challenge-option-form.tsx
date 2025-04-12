import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ControlledTextInput } from '@/shared/components/molecules/form/ControlledTextInput';
import { useFormHandler } from '@/shared/hooks/use-form-handler';

import { ChallengeOption, ChallengeOptionPayload } from '../../config/challenge-option.type';
import { ChallengeOptionFormSchema } from '../../config/challenge-option.schema';
import { ControlledSwitch } from '../../../../shared/components/molecules/form/ControlledSwitch';
import { ControlledUpload } from '@/shared/components/molecules/form/ControlledUpload';
import { ControlledFkSelect } from '@/shared/components/molecules/form/ControlledFkSelect';
import { challengeService } from '@/features/challenge/domain/challenge.service';

interface ChallengeOptionFormProps {
  initialData: Partial<ChallengeOption> | null;
  onSubmit: (input: ChallengeOptionPayload) => Promise<void>;
  onSuccess?: () => void;
}

export const ChallengeOptionForm = ({ initialData = null, onSubmit, onSuccess }: ChallengeOptionFormProps) => {
  const { form, handleSubmit, isSubmitting } = useFormHandler<ChallengeOptionPayload>({
    schema: ChallengeOptionFormSchema,
    initialValues: initialData || {
      text: '',
      correct: false,
      imageSrc: '',
      audioSrc: ''

    },
    onSubmit,
    onSuccess
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <ControlledTextInput
            name="text"
            label="Text"
            placeholder="Challenge Text"
            control={form.control}
          />
          <ControlledSwitch
            name="correct"
            label="Correct"
            control={form.control}
          />
           <ControlledFkSelect
            name='challengeId'
            label="Challenge"
            placeholder="Challenge"
            control={form.control}
            service={challengeService}
            getOptionLabel={(item) => item.question}
          />

          <ControlledUpload
            name="imageSrc"
            control={form.control}
            label="Image"
            description="Image"
          />


          <Button type="submit" className="mt-4" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : initialData ? (
              'Update ChallengeOption'
            ) : (
              'Create ChallengeOption'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}