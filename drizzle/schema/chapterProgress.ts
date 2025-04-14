import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { chapters } from "./chapter";

export const chapterProgress = pgTable("chapter_progress", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    chapterId: integer("chapter_id")
      .references(() => chapters.id, {
        onDelete: "cascade",
      })
      .notNull(),
    completed: boolean("completed").notNull().default(false),
    lastRead: timestamp("last_read"),
    readingPosition: integer("reading_position").default(0), // Position de lecture pour reprendre
  });