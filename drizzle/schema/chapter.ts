import { integer, json, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { lessons } from "./lesson";
import { chapterTypeEnum } from "./schema";

export const chapters = pgTable("chapters", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id")
    .references(() => lessons.id, {
      onDelete: "cascade",
    })
    .notNull(),
  title: text("title").notNull(),
  slug: varchar('slug', { length: 50 }).notNull().unique(),
  type: chapterTypeEnum("type").notNull().default("TEXT"),
  content: text("content").notNull(),
  order: integer("order").notNull(),
  mediaUrl: text("media_url"),
  metaData: json("meta_data"), // Pour stocker des données supplémentaires (durée, auteur, etc.)
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});