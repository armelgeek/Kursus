import 'server-only';
import { eq, sql } from 'drizzle-orm';
import slugify from 'slugify';
import { db } from '@/drizzle/db';
import { challenges } from '@/drizzle/schema/challenge';
import { Filter } from '@/shared/lib/types/filter';
import { calculatePagination } from '@/shared/lib/utils/calculate-pagination';
import { createPagination } from '@/shared/lib/utils/create-pagination';
import { filterOrderByClause } from '@/shared/lib/utils/filter-order-by-clause';
import { filterWhereClause } from '@/shared/lib/utils/filter-where-clause';
import { UseCase } from '@/shared/lib/use-cases';
import { Challenge, ChallengePayload } from '../../config/challenge.type';
import { ChallengeFormSchema } from '../../config/challenge.schema';
import { lessons } from '@/drizzle/schema';

export const challengeUseCase = new UseCase<Challenge, ChallengePayload, unknown>({
  name: 'Challenge',
  schema: ChallengeFormSchema,
  operations: {
    async create(data: ChallengePayload) {
      const slug = slugify(data.question, { lower: true });
      const existingChallenge = await db.query.challenges.findFirst({
        where: eq(challenges.slug, slug),
      });

      if (existingChallenge) {
        throw new Error('Challenge with this name already exists');
      }
      const [challenge] = await db
        .insert(challenges)
        .values({ ...data, slug })
        .returning();

      return challenge;
    },

    async getById(slug: string) {
      const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.slug, slug)
      });
      return challenge ?? null;
    },

    async update(slug: string, data: ChallengePayload) {
      await db
        .update(challenges)
        .set({ ...data, updatedAt: sql`NOW()` })
        .where(eq(challenges.slug, slug));

      return { message: 'Challenge updated successfully' };
    },

    async delete(slug: string) {
      await db
        .delete(challenges)
        .where(eq(challenges.slug, slug));

      return { message: 'Challenge deleted successfully' };
    },

    async list(filter: Filter) {
      const searchColumns = ['question'];
      const sortColumns = ['question'];

      const whereClause = {
        search: filter.search
      };
      const conditions = filterWhereClause(searchColumns, whereClause);
      const sort = filterOrderByClause(sortColumns, filter.sortBy, filter.sortDir);

      const [{ count }] = await db
        .select({
          count: sql<number>`count(*)`,
        })
        .from(challenges)
        .where(conditions);

      const { currentPage, itemsPerPage, offset } = calculatePagination(filter.page, filter.pageSize);
      const pagination = createPagination(count, currentPage, itemsPerPage, offset);

      const data = await db
        .select({
          id: challenges.id,
          question: challenges.question,
          slug: challenges.slug,
          order: challenges.order,
          type: challenges.type,
          createdAt: challenges.createdAt,
          updatedAt: challenges.updatedAt,
          lesson: {
            title: sql<string>`lessons.title`,
          },
        })
        .from(challenges)
        .where(conditions)
        .leftJoin(lessons, eq(challenges.lessonId, sql`lessons.id`))
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
