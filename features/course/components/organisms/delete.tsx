'use client';
  
  import { useCourseMutations } from '../../hooks/use-course';
  import { EntityDelete } from '@/shared/components/molecules/table/entity-delete';
  import { courseKeys } from '../../config/course.key';
  
  interface DeleteProps {
    slug: string;
    onComplete?: () => void;
  }
  
  export function Delete({ slug, onComplete }: DeleteProps) {
    const { deleteCourse } = useCourseMutations();
  
    return (
      <EntityDelete
        entityId={slug}
        entityName="Course"
        deleteService={async (id: string) => await deleteCourse(id)}
        queryKey={courseKeys.all}
        onActionComplete={onComplete}
      />
    );
  }