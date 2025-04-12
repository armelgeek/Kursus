import { relations } from "drizzle-orm";
import { challengeOptions } from "./challengeOption";
import { challenges } from "./challenge";

export const challengeOptionsRelations = relations(
    challengeOptions,
    ({ one }) => ({
      challenge: one(challenges, {
        fields: [challengeOptions.challengeId],
        references: [challenges.id],
      }),
    })
  );
  
  