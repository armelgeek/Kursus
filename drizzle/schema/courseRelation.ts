import { relations } from "drizzle-orm";
import { units } from "./unit";
import { userProgress } from "./userProgress";
import { courses } from "./course";

export const coursesRelations = relations(courses, ({ many }) => ({
  userProgress: many(userProgress),
  units: many(units),
}));
