import { z } from 'zod';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { courses } from '@/drizzle/schema/course';
import { PaginatedResponse } from '@/shared/lib/types/pagination';
export const CourseSelectSchema = createSelectSchema(courses);

export const CourseFormSchema = createInsertSchema(courses, {
  id: (s) => s,
  title: (s) => s.min(1, 'Title is required.')
}).pick({
  title: true,
  imageSrc: true
});

export type Course = z.infer<typeof CourseSelectSchema>;

export type CoursePayload = z.infer<typeof CourseFormSchema>;

export type PaginatedPage = PaginatedResponse<Course>;