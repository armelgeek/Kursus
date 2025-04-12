import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { courses } from "./course";
import { MAX_HEARTS } from "@/shared/lib/constants/app.constant";

export const userProgress = pgTable("user_progress", {
  userId: text("user_id").primaryKey(),
  userName: text("user_name").notNull().default("User"),
  userImageSrc: text("user_image_src").notNull().default("/mascot.svg"),
  activeCourseId: integer("active_course_id").references(() => courses.id, {
    onDelete: "cascade",
  }),
  hearts: integer("hearts").notNull().default(MAX_HEARTS),
  points: integer("points").notNull().default(0),
});