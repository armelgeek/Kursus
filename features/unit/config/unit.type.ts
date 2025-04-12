import { z } from 'zod';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { units } from '@/drizzle/schema/unit';
import { PaginatedResponse } from '@/shared/lib/types/pagination';
export const UnitSelectSchema = createSelectSchema(units);

export const UnitFormSchema = createInsertSchema(units, {
  id: (s) => s,
  title: (s) => s.min(1, 'Title is required.'),
  description: (s) => s.min(1, 'Description is required.'),
  courseId: (s) => s,
}).pick({
  id: true,
  title: true,
  description: true,
  courseId: true,
});

export type Unit = z.infer<typeof UnitSelectSchema>;

export type UnitPayload = z.infer<typeof UnitFormSchema>;

export type PaginatedPage = PaginatedResponse<Unit>;