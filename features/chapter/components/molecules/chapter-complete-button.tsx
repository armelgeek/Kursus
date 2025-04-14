"use client";

import { useTransition } from "react";
import { upsertChapterProgress } from "../../domain/use-cases/chapter.action";

export default function ChapterCompleteButton({ chapterId }: { chapterId: number }) {
  const [isPending, startTransition] = useTransition();

  const handleComplete = () => {
    startTransition(() => {
      upsertChapterProgress(chapterId, true);
    });
  };

  return (
    <button
      onClick={handleComplete}
      disabled={isPending}
      className="bg-green-600  px-4 py-2 rounded"
    >
      {isPending ? "En cours..." : "Marquer comme complété ✅"}
    </button>
  );
}
