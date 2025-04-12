import { relations } from "drizzle-orm";
import { challenges } from "./challenge";
import { challengeOptions } from "./challengeOption";
import { challengeProgress } from "./challengeProgress";
import { lessons } from "./lesson";

export const challengesRelations = relations(challenges, ({ one, many }) => ({
    lesson: one(lessons, {
      fields: [challenges.lessonId],
      references: [lessons.id],
    }),
    challengeOptions: many(challengeOptions),
    challengeProgress: many(challengeProgress),
  }));
  
  
  