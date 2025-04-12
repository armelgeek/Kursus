'use client';
  
  import { useLessonMutations } from '../../hooks/use-lesson';
  import { EntityDelete } from '@/shared/components/molecules/table/entity-delete';
  import { lessonKeys } from '../../config/lesson.key';
  
  interface DeleteProps {
    slug: string;
    onComplete?: () => void;
  }
  
  export function Delete({ slug, onComplete }: DeleteProps) {
    const { deleteLesson } = useLessonMutations();
  
    return (
      <EntityDelete
        entityId={slug}
        entityName="Lesson"
        deleteService={async (id: string) => await deleteLesson(id)}
        queryKey={lessonKeys.all}
        onActionComplete={onComplete}
      />
    );
  }