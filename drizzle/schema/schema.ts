import { pgEnum } from "drizzle-orm/pg-core";

export const challengesEnum = pgEnum("type", ["SELECT", "ASSIST"]);
export const chapterTypeEnum = pgEnum("chapter_type", ["TEXT", "VIDEO", "AUDIO"]);
