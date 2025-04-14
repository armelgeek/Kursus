import { relations } from "drizzle-orm";
import { challenges } from "./challenge";
import { challengeOptions } from "./challenge-option";
import { challengeProgress } from "./challengeProgress";
import { lessons } from "./lesson";
import { chapters } from "./chapter";

export const challengesRelations = relations(challenges, ({ one, many }) => ({
    lesson: one(lessons, {
      fields: [challenges.lessonId],
      references: [lessons.id],
    }),
    associatedChapter: one(chapters, {
      fields: [challenges.associatedChapterId],
      references: [chapters.id],
    }),
    challengeOptions: many(challengeOptions),
    challengeProgress: many(challengeProgress),
  }));
  
  
  