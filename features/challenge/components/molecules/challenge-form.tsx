import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ControlledTextInput } from '@/shared/components/molecules/form/ControlledTextInput';
import { useFormHandler } from '@/shared/hooks/use-form-handler';

import { Challenge, ChallengePayload } from '../../config/challenge.type';
import { ChallengeFormSchema } from '../../config/challenge.schema';
import { ControlledFormSelect } from '@/shared/components/molecules/form';
import { ControlledFkSelect } from '@/shared/components/molecules/form/ControlledFkSelect';
import { lessonService } from '@/features/lesson/domain/lesson.service';

interface ChallengeFormProps {
  initialData: Partial<Challenge> | null;
  onSubmit: (input: ChallengePayload) => Promise<void>;
  onSuccess?: () => void;
}

export const ChallengeForm = ({ initialData = null, onSubmit, onSuccess }: ChallengeFormProps) => {
  const { form, handleSubmit, isSubmitting } = useFormHandler<ChallengePayload>({
    schema: ChallengeFormSchema,
    initialValues: initialData || {
      question: '',
      type: 'SELECT',
      order: 1
    },
    onSubmit,
    onSuccess
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <ControlledTextInput
            name="question"
            label="Question"
            placeholder="What is the capital of France?"
            control={form.control}
          />
          <ControlledFormSelect
            name="type"
            label="Type"
            placeholder="Select a type"
            options={[
              { label: 'SELECT', value: 'SELECT' },
              { label: 'ASSIST', value: 'ASSIST' }
            ]}
            control={form.control}
          />
          <ControlledFkSelect
            name='lessonId'
            label="Lesson"
            placeholder="Lesson Name"
            control={form.control}
            service={lessonService}
            getOptionLabel={(item) => item.title}
          />
          <ControlledTextInput
            name="order"
            type='number'
            label="Order"
            placeholder="Unit Order"
            control={form.control}
          />

          <Button type="submit" className="mt-4" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : initialData ? (
              'Update Challenge'
            ) : (
              'Create Challenge'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}