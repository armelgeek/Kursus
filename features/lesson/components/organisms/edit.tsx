'use client';
  
  import { EntityForm } from '@/shared/components/molecules/form/add-entity';
  import { LessonPayload } from '../../config/lesson.type';
  import { LessonForm } from '../molecules/lesson-form';
  import { lessonKeys } from '../../config/lesson.key';
  import { useLesson, useLessonMutations } from '../../hooks/use-lesson';
  
  interface EditProps {
    slug: string;
    onComplete?: () => void;
  }
  
  export function Edit({ slug, onComplete }: EditProps) {
    const { lesson } = useLesson(slug);
    const { updateLesson, isUpdating } = useLessonMutations();
  
    const handleSubmit = async (data: LessonPayload) => {
      await updateLesson({ slug, data });
      onComplete?.();
    };
  
    if (!lesson) {
      return null;
    }
  
    return (
      <EntityForm<LessonPayload>
        title="Lesson"
        initialData={lesson}
        onSubmit={handleSubmit}
        isSubmitting={isUpdating}
        Form={LessonForm}
        queryKey={lessonKeys.all}
        mode="edit"
      />
    );
  }