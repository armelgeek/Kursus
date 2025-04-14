'use client';
  
  import { useChapterMutations } from '../../hooks/use-chapter';
  import { EntityDelete } from '@/shared/components/molecules/table/entity-delete';
  import { chapterKeys } from '../../config/chapter.key';
  
  interface DeleteProps {
    slug: string;
    onComplete?: () => void;
  }
  
  export function Delete({ slug, onComplete }: DeleteProps) {
    const { deleteChapter } = useChapterMutations();
  
    return (
      <EntityDelete
        entityId={slug}
        entityName="Chapter"
        deleteService={async (id: string) => await deleteChapter(id)}
        queryKey={chapterKeys.all}
        onActionComplete={onComplete}
      />
    );
  }