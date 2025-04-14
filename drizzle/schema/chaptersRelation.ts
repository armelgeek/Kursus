import { relations } from "drizzle-orm";
import { chapterProgress } from "./chapterProgress";
import { chapters } from "./chapter";
import { lessons } from "./lesson";

export const chaptersRelations = relations(chapters, ({ one, many }) => ({
    lesson: one(lessons, {
      fields: [chapters.lessonId],
      references: [lessons.id],
    }),
    chapterProgress: many(chapterProgress),
  }));