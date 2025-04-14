'use client';
  
  import { EntityForm } from '@/shared/components/molecules/form/add-entity';
  import { ChapterPayload } from '../../config/chapter.type';
  import { ChapterForm } from '../molecules/chapter-form';
  import { chapterKeys } from '../../config/chapter.key';
  import { useChapter, useChapterMutations } from '../../hooks/use-chapter';
  
  interface EditProps {
    slug: string;
    onComplete?: () => void;
  }
  
  export function Edit({ slug, onComplete }: EditProps) {
    const { chapter } = useChapter(slug);
    const { updateChapter, isUpdating } = useChapterMutations();
  
    const handleSubmit = async (data: ChapterPayload) => {
      await updateChapter({ slug, data });
      onComplete?.();
    };
  
    if (!chapter) {
      return null;
    }
  
    return (
      <EntityForm<ChapterPayload>
        title="Chapter"
        initialData={chapter}
        onSubmit={handleSubmit}
        isSubmitting={isUpdating}
        Form={ChapterForm}
        queryKey={chapterKeys.all}
        mode="edit"
      />
    );
  }