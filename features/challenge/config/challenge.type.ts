import { z } from 'zod';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { challenges } from '@/drizzle/schema/challenge';
import { PaginatedResponse } from '@/shared/lib/types/pagination';
export const ChallengeSelectSchema = createSelectSchema(challenges);

export const ChallengeFormSchema = createInsertSchema(challenges, {
  id: (s) => s,
  lessonId: (s) => s,
  question: (s) => s.min(1, { message: 'Question is required' }),
  order: (s) => s.min(1, { message: 'Order is required' }),
}).pick({
  id: true,
  lessonId: true,
  type: true,
  question: true,
  order: true,
});

export type Challenge = z.infer<typeof ChallengeSelectSchema>;

export type ChallengePayload = z.infer<typeof ChallengeFormSchema>;

export type PaginatedPage = PaginatedResponse<Challenge>;