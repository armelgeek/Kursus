import { relations } from "drizzle-orm";
import { challenges } from "./challenge";
import { lessons } from "./lesson";
import { units } from "./unit";
import { chapters } from "./chapter";

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  unit: one(units, {
    fields: [lessons.unitId],
    references: [units.id],
  }),
  challenges: many(challenges),
  chapters: many(chapters)
}));
