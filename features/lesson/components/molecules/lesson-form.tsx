import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ControlledTextInput } from '@/shared/components/molecules/form/ControlledTextInput';
import { useFormHandler } from '@/shared/hooks/use-form-handler';

import { Lesson, LessonPayload } from '../../config/lesson.type';
import { LessonFormSchema } from '../../config/lesson.schema';
import { ControlledFkSelect } from '@/shared/components/molecules/form/ControlledFkSelect';
import { unitService } from '@/features/unit/domain/unit.service';

interface LessonFormProps {
  initialData: Partial<Lesson> | null;
  onSubmit: (input: LessonPayload) => Promise<void>;
  onSuccess?: () => void;
}

export const LessonForm = ({ initialData = null, onSubmit, onSuccess }: LessonFormProps) => {
  const { form, handleSubmit, isSubmitting } = useFormHandler<LessonPayload>({
    schema: LessonFormSchema,
    initialValues: initialData || {
      title: '',
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
            name="title"
            label="Title"
            placeholder="Lesson Title"
            control={form.control}
          />

          <ControlledFkSelect
            name='unitId'
            label="Unit"
            placeholder="Unit Name"
            control={form.control}
            service={unitService}
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
              'Update Lesson'
            ) : (
              'Create Lesson'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}