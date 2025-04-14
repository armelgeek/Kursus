import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ControlledTextInput } from '@/shared/components/molecules/form/ControlledTextInput';
import { useFormHandler } from '@/shared/hooks/use-form-handler';

import { Chapter, ChapterPayload } from '../../config/chapter.type';
import { ChapterFormSchema } from '../../config/chapter.schema';
import { ControlledTextareaInput } from '@/shared/components/molecules/form/ControlledTextareaInput';
import { ControlledFormSelect } from '@/shared/components/molecules/form';
import { ControlledFkSelect } from '@/shared/components/molecules/form/ControlledFkSelect';
import { lessonService } from '@/features/lesson/domain/lesson.service';

interface ChapterFormProps {
  initialData: Partial<Chapter> | null;
  onSubmit: (input: ChapterPayload) => Promise<void>;
  onSuccess?: () => void;
}

export const ChapterForm = ({ initialData = null, onSubmit, onSuccess }: ChapterFormProps) => {
  const { form, handleSubmit, isSubmitting } = useFormHandler<ChapterPayload>({
    schema: ChapterFormSchema,
    initialValues: initialData || {
      title: '',
      type: 'TEXT',
      content: '',
      order: 1,
      mediaUrl: ''
    },
    onSubmit,
    onSuccess
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <ControlledFkSelect
            name='lessonId'
            label="Lesson"
            placeholder="Lesson Name"
            control={form.control}
            service={lessonService}
            getOptionLabel={(item) => item.title}
          />
          <ControlledTextInput
            name="title"
            label="Title"
            placeholder="Chapter Title"
            control={form.control}
          />

          <ControlledFormSelect
            name="type"
            label="Type"
            placeholder="Select a type"
            options={[
              { label: 'TEXT', value: 'TEXT' },
              { label: 'AUDIO', value: 'AUDIO' },
              { label: 'VIDEO', value: 'VIDEO' }
            ]}
            control={form.control}
          />

          <ControlledTextareaInput
            name="content"
            label="Content"
            placeholder="Chapter Content"
            control={form.control}
          />

          <ControlledTextInput
            name="order"
            label="Order"
            placeholder="Chapter Order"
            type="number"
            control={form.control}
          />

          <ControlledTextInput
            name="mediaUrl"
            label="Media URL"
            placeholder="Media URL (optional)"
            control={form.control}
          />

          <Button type="submit" className="mt-4" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : initialData ? (
              'Update Chapter'
            ) : (
              'Create Chapter'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};