import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ControlledTextInput } from '@/shared/components/molecules/form/ControlledTextInput';
import { useFormHandler } from '@/shared/hooks/use-form-handler';

import { Course, CoursePayload } from '../../config/course.type';
import { CourseFormSchema } from '../../config/course.schema';
import { ControlledUpload } from '@/shared/components/molecules/form/ControlledUpload';

interface CourseFormProps {
  initialData: Partial<Course> | null;
  onSubmit: (input: CoursePayload) => Promise<void>;
  onSuccess?: () => void;
}

export const CourseForm = ({ initialData = null, onSubmit, onSuccess }: CourseFormProps) => {
  const { form, handleSubmit, isSubmitting } = useFormHandler<CoursePayload>({
    schema: CourseFormSchema,
    initialValues: initialData || {
      title: '',
      imageSrc: null
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
            placeholder="Course Name"
            control={form.control}
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
              'Update Course'
            ) : (
              'Create Course'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}