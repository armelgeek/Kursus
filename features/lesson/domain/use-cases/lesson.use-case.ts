import 'server-only';
import { eq, sql } from 'drizzle-orm';
import slugify from 'slugify';
import { db } from '@/drizzle/db';
import { lessons } from '@/drizzle/schema/lesson';
import { Filter } from '@/shared/lib/types/filter';
import { calculatePagination } from '@/shared/lib/utils/calculate-pagination';
import { createPagination } from '@/shared/lib/utils/create-pagination';
import { filterOrderByClause } from '@/shared/lib/utils/filter-order-by-clause';
import { filterWhereClause } from '@/shared/lib/utils/filter-where-clause';
import { UseCase } from '@/shared/lib/use-cases';
import { Lesson, LessonPayload } from '../../config/lesson.type';
import { LessonFormSchema } from '../../config/lesson.schema';
import { units } from '@/drizzle/schema';

export const lessonUseCase = new UseCase<Lesson, LessonPayload, unknown>({
  name: 'Lesson',
  schema: LessonFormSchema,
  operations: {
    async create(data: LessonPayload) {
      const slug = slugify(data.title, { lower: true });
      const existingLesson = await db.query.lessons.findFirst({
        where: eq(lessons.slug, slug),
      });
      
      if (existingLesson) {
        throw new Error('Lesson with this name already exists');
      }
      const [lesson] = await db
        .insert(lessons)
        .values({ ...data, slug })
        .returning();
        
      return lesson;
    },
    
    async getById(slug: string) {
      const lesson = await db.query.lessons.findFirst({
        where: eq(lessons.slug, slug)
      });
      return lesson ?? null;
    },
    
    async update(slug: string, data: LessonPayload) {
      await db
        .update(lessons)
        .set({ ...data, updatedAt: sql`NOW()` })
        .where(eq(lessons.slug, slug));
      
      return { message: 'Lesson updated successfully' };
    },
    
    async delete(slug: string) {
      await db
        .delete(lessons)
        .where(eq(lessons.slug, slug));
      
      return { message: 'Lesson deleted successfully' };
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
        .from(lessons)
        .where(conditions);

      const { currentPage, itemsPerPage, offset } = calculatePagination(filter.page, filter.pageSize);
      const pagination = createPagination(count, currentPage, itemsPerPage, offset);

      const data = await db
        .select({
          id: lessons.id,
          title: lessons.title,
          slug: lessons.slug,
          order: lessons.order,
          createdAt: lessons.createdAt,
          updatedAt: lessons.updatedAt,
          unit: {
              title: sql<string>`units.title`,
          },
        })
        .from(lessons)
        .where(conditions)
        .leftJoin(units, eq(lessons.unitId, sql`units.id`))
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
