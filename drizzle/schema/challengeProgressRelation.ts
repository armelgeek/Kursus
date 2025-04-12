import { relations } from "drizzle-orm";
import { challenges } from "./challenge";
import { challengeProgress } from "./challengeProgress";

export const challengeProgressRelations = relations(
    challengeProgress,
    ({ one }) => ({
      challenge: one(challenges, {
        fields: [challengeProgress.challengeId],
        references: [challenges.id],
      }),
    })
  );
  
  