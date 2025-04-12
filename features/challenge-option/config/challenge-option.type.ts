import { z } from 'zod';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { challengeOptions } from '@/drizzle/schema/challenge-option';
import { PaginatedResponse } from '@/shared/lib/types/pagination';
export const ChallengeOptionSelectSchema = createSelectSchema(challengeOptions);

export const ChallengeOptionFormSchema = createInsertSchema(challengeOptions, {
  id: (s) => s,
  challengeId: (s) => s,
}).pick({
  id: true,
  challengeId: true,
  text: true,
  correct: true,
  imageSrc: true,
  audioSrc: true,
});

export type ChallengeOption = z.infer<typeof ChallengeOptionSelectSchema>;

export type ChallengeOptionPayload = z.infer<typeof ChallengeOptionFormSchema>;

export type PaginatedPage = PaginatedResponse<ChallengeOption>;