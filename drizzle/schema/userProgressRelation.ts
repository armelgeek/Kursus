import { relations } from "drizzle-orm";
import { courses } from "./course";
import { userProgress } from "./userProgress";

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  activeCourse: one(courses, {
    fields: [userProgress.activeCourseId],
    references: [courses.id],
  }),
}));