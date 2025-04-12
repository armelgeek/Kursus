import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ControlledTextInput } from '@/shared/components/molecules/form/ControlledTextInput';
import { useFormHandler } from '@/shared/hooks/use-form-handler';

import { Unit, UnitPayload } from '../../config/unit.type';
import { UnitFormSchema } from '../../config/unit.schema';
import { ControlledFkSelect } from '@/shared/components/molecules/form/ControlledFkSelect';
import { courseService } from '@/features/course/domain/course.service';
import { Course } from '@/features/course/config/course.type';
import { ControlledTextareaInput } from '@/shared/components/molecules/form/ControlledTextareaInput';

interface UnitFormProps {
  initialData: Partial<Unit> | null;
  onSubmit: (input: UnitPayload) => Promise<void>;
  onSuccess?: () => void;
}

export const UnitForm = ({ initialData = null, onSubmit, onSuccess }: UnitFormProps) => {
  const { form, handleSubmit, isSubmitting } = useFormHandler<UnitPayload>({
    schema: UnitFormSchema,
    initialValues: initialData || {
      title: '',
      order: 1,
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
            placeholder="Unit Name"
            control={form.control}
          />

          <ControlledFkSelect
            name='courseId'
            label="Course"
            placeholder="Course Name"
            control={form.control}
            service={courseService}
            getOptionLabel={(item) => item.title}
          />

          <ControlledTextareaInput
           name="description"
           label="Description"
           placeholder="Unit Description"
           control={form.control}
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
              'Update Unit'
            ) : (
              'Create Unit'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}