'use client';
  
  import { EntityForm } from '@/shared/components/molecules/form/add-entity';
  import { CoursePayload } from '../../config/course.type';
  import { CourseForm } from '../molecules/course-form';
  import { courseKeys } from '../../config/course.key';
  import { useCourse, useCourseMutations } from '../../hooks/use-course';
  
  interface EditProps {
    slug: string;
    onComplete?: () => void;
  }
  
  export function Edit({ slug, onComplete }: EditProps) {
    const { course } = useCourse(slug);
    const { updateCourse, isUpdating } = useCourseMutations();
  
    const handleSubmit = async (data: CoursePayload) => {
      await updateCourse({ slug, data });
      onComplete?.();
    };
  
    if (!course) {
      return null;
    }
  
    return (
      <EntityForm<CoursePayload>
        title="Course"
        initialData={course}
        onSubmit={handleSubmit}
        isSubmitting={isUpdating}
        Form={CourseForm}
        queryKey={courseKeys.all}
        mode="edit"
      />
    );
  }