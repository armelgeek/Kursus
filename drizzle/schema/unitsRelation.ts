import { relations } from "drizzle-orm";
import { courses } from "./course";
import { lessons } from "./lesson";
import { units } from "./unit";

export const unitsRelations = relations(units, ({ many, one }) => ({
  course: one(courses, {
    fields: [units.courseId],
    references: [courses.id],
  }),
  lessons: many(lessons),
}));
