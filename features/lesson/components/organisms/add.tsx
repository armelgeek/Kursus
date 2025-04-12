import { LessonForm } from '../molecules/lesson-form';
  import { useLessonMutations } from '../../hooks/use-lesson';
  import { lessonKeys } from '../../config/lesson.key';
  import { LessonPayload } from '../../config/lesson.type';
  import { EntityForm } from '@/shared/components/molecules/form/add-entity';
  
  export function Add() {
    const { createLesson, isCreating } = useLessonMutations();
  
    const handleSubmit = async (data: LessonPayload) => {
      await createLesson(data);
    };
  
    return (
      <EntityForm<LessonPayload>
        title="Lesson"
        initialData={null}
        onSubmit={handleSubmit}
        isSubmitting={isCreating}
        Form={LessonForm}
        queryKey={lessonKeys.all}
        mode="add"
      />
    );
  }