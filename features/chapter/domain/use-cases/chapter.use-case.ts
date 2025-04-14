import 'server-only';
import { eq, sql } from 'drizzle-orm';
import slugify from 'slugify';
import { db } from '@/drizzle/db';
import { chapters } from '@/drizzle/schema/chapter';
import { Filter } from '@/shared/lib/types/filter';
import { calculatePagination } from '@/shared/lib/utils/calculate-pagination';
import { createPagination } from '@/shared/lib/utils/create-pagination';
import { filterOrderByClause } from '@/shared/lib/utils/filter-order-by-clause';
import { filterWhereClause } from '@/shared/lib/utils/filter-where-clause';
import { UseCase } from '@/shared/lib/use-cases';
import { Chapter, ChapterPayload } from '../../config/chapter.type';
import { ChapterFormSchema } from '../../config/chapter.schema';
import { lessons } from '@/drizzle/schema';

export const chapterUseCase = new UseCase<Chapter, ChapterPayload, unknown>({
  name: 'Chapter',
  schema: ChapterFormSchema,
  operations: {
    async create(data: ChapterPayload) {
      const slug = slugify(data.title, { lower: true });
      const existingChapter = await db.query.chapters.findFirst({
        where: eq(chapters.slug, slug),
      });
      
      if (existingChapter) {
        throw new Error('Chapter with this name already exists');
      }
      const [chapter] = await db
        .insert(chapters)
        .values({ ...data, slug })
        .returning();
        
      return chapter;
    },
    
    async getById(slug: string) {
      const chapter = await db.query.chapters.findFirst({
        where: eq(chapters.slug, slug)
      });
      return chapter ?? null;
    },
    
    async update(slug: string, data: ChapterPayload) {
      await db
        .update(chapters)
        .set({ ...data, updatedAt: sql`NOW()` })
        .where(eq(chapters.slug, slug));
      
      return { message: 'Chapter updated successfully' };
    },
    
    async delete(slug: string) {
      await db
        .delete(chapters)
        .where(eq(chapters.slug, slug));
      
      return { message: 'Chapter deleted successfully' };
    },
    
    async list(filter: Filter) {
      const searchColumns = ['title'];
      const sortColumns = ['title'];

      const whereClause = {
        search: filter.search
      };
      const conditions = filterWhereClause(searchColumns, whereClause);
      const sort = filterOrderByClause(sortColumns, filter.sortBy, filter.sortDir);

      const [{ count }] = await db
        .select({
          count: sql<number>`count(*)`,
        })
        .from(chapters)
        .where(conditions);

      const { currentPage, itemsPerPage, offset } = calculatePagination(filter.page, filter.pageSize);
      const pagination = createPagination(count, currentPage, itemsPerPage, offset);

      const data = await db
        .select({
          id: chapters.id,
          title: chapters.title,
          slug: chapters.slug,
          type: chapters.type,
          order: chapters.order,
          mediaUrl: chapters.mediaUrl,
          createdAt: chapters.createdAt,
          updatedAt: chapters.updatedAt,
          lesson: {
            title: sql<string>`lessons.title`,
          },
        })
        .from(chapters)
        .where(conditions)
        .leftJoin(lessons, eq(chapters.lessonId, sql`lessons.id`))
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
