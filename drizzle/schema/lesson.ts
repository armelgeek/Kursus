import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar
} from "drizzle-orm/pg-core";
import { units } from "./unit";
export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  unitId: integer("unit_id")
    .references(() => units.id, {
      onDelete: "cascade",
    })
    .notNull(),
  order: integer("order").notNull(),
  slug: varchar('slug', { length: 50 }).notNull().unique(),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});
