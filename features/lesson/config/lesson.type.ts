import { z } from 'zod';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { lessons } from '@/drizzle/schema/lesson';
import { PaginatedResponse } from '@/shared/lib/types/pagination';
export const LessonSelectSchema = createSelectSchema(lessons);

export const LessonFormSchema = createInsertSchema(lessons, {
  id: (s) => s,
  title: (s) => s.min(1, 'Title is required.'),
  unitId: (s) => s,
}).pick({
  id: true,
  title: true,
  unitId: true,
  order: true,
});

export type Lesson = z.infer<typeof LessonSelectSchema>;

export type LessonPayload = z.infer<typeof LessonFormSchema>;

export type PaginatedPage = PaginatedResponse<Lesson>;