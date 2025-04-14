import { ChapterForm } from '../molecules/chapter-form';
  import { useChapterMutations } from '../../hooks/use-chapter';
  import { chapterKeys } from '../../config/chapter.key';
  import { ChapterPayload } from '../../config/chapter.type';
  import { EntityForm } from '@/shared/components/molecules/form/add-entity';
  
  export function Add() {
    const { createChapter, isCreating } = useChapterMutations();
  
    const handleSubmit = async (data: ChapterPayload) => {
      await createChapter(data);
    };
  
    return (
      <EntityForm<ChapterPayload>
        title="Chapter"
        initialData={null}
        onSubmit={handleSubmit}
        isSubmitting={isCreating}
        Form={ChapterForm}
        queryKey={chapterKeys.all}
        mode="add"
      />
    );
  }