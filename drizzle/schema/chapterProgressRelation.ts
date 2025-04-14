import { relations } from "drizzle-orm";
import { chapterProgress } from "./chapterProgress";
import { chapters } from "./chapter";

export const chapterProgressRelations = relations(
    chapterProgress,
    ({ one }) => ({
      chapter: one(chapters, {
        fields: [chapterProgress.chapterId],
        references: [chapters.id],
      }),
    })
  );
  