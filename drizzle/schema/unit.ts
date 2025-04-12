
import {
    integer,
    pgTable,
    serial,
    text
  } from "drizzle-orm/pg-core";
import { courses } from "./course";
  
export const units = pgTable("units", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(), 
  description: text("description").notNull(),
  courseId: integer("course_id")
    .references(() => courses.id, {
      onDelete: "cascade",
    })
    .notNull(),
  order: integer("order").notNull(),
});
