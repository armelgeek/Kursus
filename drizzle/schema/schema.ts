import { pgEnum } from "drizzle-orm/pg-core";

export const challengesEnum = pgEnum("type", ["SELECT", "ASSIST"]);