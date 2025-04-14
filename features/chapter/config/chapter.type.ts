import { z } from 'zod';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { chapters } from '@/drizzle/schema/chapter';
import { PaginatedResponse } from '@/shared/lib/types/pagination';
export const ChapterSelectSchema = createSelectSchema(chapters);

export const ChapterFormSchema = createInsertSchema(chapters, {
  id: (s) => s,
  lessonId: (s) => s,
}).pick({
  id: true,
  lessonId: true,
  title: true,
  type: true,
  content: true,
  order: true,
  mediaUrl: true,
  metaData: true
});

export type Chapter = z.infer<typeof ChapterSelectSchema>;

export type ChapterPayload = z.infer<typeof ChapterFormSchema>;

export type PaginatedPage = PaginatedResponse<Chapter>;