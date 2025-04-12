import { CourseForm } from '../molecules/course-form';
  import { useCourseMutations } from '../../hooks/use-course';
  import { courseKeys } from '../../config/course.key';
  import { CoursePayload } from '../../config/course.type';
  import { EntityForm } from '@/shared/components/molecules/form/add-entity';
  
  export function Add() {
    const { createCourse, isCreating } = useCourseMutations();
  
    const handleSubmit = async (data: CoursePayload) => {
      await createCourse(data);
    };
  
    return (
      <EntityForm<CoursePayload>
        title="Course"
        initialData={null}
        onSubmit={handleSubmit}
        isSubmitting={isCreating}
        Form={CourseForm}
        queryKey={courseKeys.all}
        mode="add"
      />
    );
  }