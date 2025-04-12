import 'server-only';
import { eq, sql } from 'drizzle-orm';
import slugify from 'slugify';
import { db } from '@/drizzle/db';
import { challengeOptions } from '@/drizzle/schema/challenge-option';
import { Filter } from '@/shared/lib/types/filter';
import { calculatePagination } from '@/shared/lib/utils/calculate-pagination';
import { createPagination } from '@/shared/lib/utils/create-pagination';
import { filterOrderByClause } from '@/shared/lib/utils/filter-order-by-clause';
import { filterWhereClause } from '@/shared/lib/utils/filter-where-clause';
import { UseCase } from '@/shared/lib/use-cases';
import { ChallengeOption, ChallengeOptionPayload } from '../../config/challenge-option.type';
import { ChallengeOptionFormSchema } from '../../config/challenge-option.schema';
import { challenges } from '@/drizzle/schema';

export const challengeOptionUseCase = new UseCase<ChallengeOption, ChallengeOptionPayload, unknown>({
  name: 'ChallengeOption',
  schema: ChallengeOptionFormSchema,
  operations: {
    async create(data: ChallengeOptionPayload) {
      const slug = slugify(data.text, { lower: true });
      const existingChallengeOption = await db.query.challengeOptions.findFirst({
        where: eq(challengeOptions.slug, slug),
      });

      if (existingChallengeOption) {
        throw new Error('ChallengeOption with this name already exists');
      }
      const [challengeOption] = await db
        .insert(challengeOptions)
        .values({ ...data, slug })
        .returning();

      return challengeOption;
    },

    async getById(slug: string) {
      const challengeOption = await db.query.challengeOptions.findFirst({
        where: eq(challengeOptions.slug, slug)
      });
      return challengeOption ?? null;
    },

    async update(slug: string, data: ChallengeOptionPayload) {
      await db
        .update(challengeOptions)
        .set({ ...data, updatedAt: sql`NOW()` })
        .where(eq(challengeOptions.slug, slug));

      return { message: 'ChallengeOption updated successfully' };
    },

    async delete(slug: string) {
      await db
        .delete(challengeOptions)
        .where(eq(challengeOptions.slug, slug));

      return { message: 'ChallengeOption deleted successfully' };
    },

    async list(filter: Filter) {
      const searchColumns = ['name'];
      const sortColumns = ['name'];

      const whereClause = {
        search: filter.search
      };
      const conditions = filterWhereClause(searchColumns, whereClause);
      const sort = filterOrderByClause(sortColumns, filter.sortBy, filter.sortDir);

      const [{ count }] = await db
        .select({
          count: sql<number>`count(*)`,
        })
        .from(challengeOptions)
        .where(conditions);

      const { currentPage, itemsPerPage, offset } = calculatePagination(filter.page, filter.pageSize);
      const pagination = createPagination(count, currentPage, itemsPerPage, offset);

      const data = await db
        .select({
          id: challengeOptions.id,
          text: challengeOptions.text,
          slug: challengeOptions.slug,
          correct: challengeOptions.correct,
          imageSrc: challengeOptions.imageSrc,
          audioSrc: challengeOptions.audioSrc,
          createdAt: challengeOptions.createdAt,
          updatedAt: challengeOptions.updatedAt,
          challenge: {
            question: sql<string>`challenges.question`,
          },
        })
        .from(challengeOptions)
        .leftJoin(challenges, eq(challengeOptions.challengeId, sql`challenges.id`))
        .where(conditions)
        .orderBy(sort)
        .limit(itemsPerPage)
        .offset(offset);

      return {
        data,
        meta: {
          pagination,
        },
      };
    }
  }
});
