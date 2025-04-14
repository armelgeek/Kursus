import ChapterCompleteButton from "@/features/chapter/components/molecules/chapter-complete-button";
import { getChapterById } from "@/features/chapter/domain/use-cases/chapter.action";
import { notFound } from "next/navigation";

export default async function ChapterPage({ params }: { params: { chapterId: string } }) {
  const chapter = await getChapterById(Number(params.chapterId));

  if (!chapter) return notFound();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">{chapter.title}</h1>
      <p className="text-gray-700">{chapter.content}</p>

      <ChapterCompleteButton chapterId={Number(params.chapterId)} />
    </div>
  );
}
