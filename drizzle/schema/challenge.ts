import {
    integer,
    pgTable,
    serial,
    text,
    timestamp,
    varchar
  } from "drizzle-orm/pg-core";
import { challengesEnum } from "./schema";
import { lessons } from "./lesson";
export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id")
    .references(() => lessons.id, {
      onDelete: "cascade",
    })
    .notNull(),
  type: challengesEnum("type").notNull(),
  question: text("question").notNull(),
  order: integer("order").notNull(),
  slug: varchar('slug', { length: 50 }).notNull().unique(),
        createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
        updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});
