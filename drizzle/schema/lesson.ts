import {
    integer,
    pgTable,
    serial,
    text
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
});
