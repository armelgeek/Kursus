import 'server-only';
import { eq, sql } from 'drizzle-orm';
import slugify from 'slugify';
import { db } from '@/drizzle/db';
import { courses } from '@/drizzle/schema/course';
import { Filter } from '@/shared/lib/types/filter';
import { calculatePagination } from '@/shared/lib/utils/calculate-pagination';
import { createPagination } from '@/shared/lib/utils/create-pagination';
import { filterOrderByClause } from '@/shared/lib/utils/filter-order-by-clause';
import { filterWhereClause } from '@/shared/lib/utils/filter-where-clause';
import { UseCase } from '@/shared/lib/use-cases';
import { Course, CoursePayload } from '../../config/course.type';
import { CourseFormSchema } from '../../config/course.schema';

export const courseUseCase = new UseCase<Course, CoursePayload, unknown>({
  name: 'Course',
  schema: CourseFormSchema,
  operations: {
    async create(data: CoursePayload) {
      const slug = slugify(data.title, { lower: true });
      console.log('slug', slug);
      const existingCourse = await db.query.courses.findFirst({
        where: eq(courses.slug, slug),
      });
      
      if (existingCourse) {
        throw new Error('Course with this name already exists');
      }
      const [course] = await db
        .insert(courses)
        .values({ ...data, slug })
        .returning();
        
      return course;
    },
    
    async getById(slug: string) {
      const course = await db.query.courses.findFirst({
        where: eq(courses.slug, slug)
      });
      return course ?? null;
    },
    
    async update(slug: string, data: CoursePayload) {
      await db
        .update(courses)
        .set({ ...data, updatedAt: sql`NOW()` })
        .where(eq(courses.slug, slug));
      
      return { message: 'Course updated successfully' };
    },
    
    async delete(slug: string) {
      await db
        .delete(courses)
        .where(eq(courses.slug, slug));
      
      return { message: 'Course deleted successfully' };
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
        .from(courses)
        .where(conditions);

      const { currentPage, itemsPerPage, offset } = calculatePagination(filter.page, filter.pageSize);
      const pagination = createPagination(count, currentPage, itemsPerPage, offset);

      const data = await db
        .select({
          id: courses.id,
          title: courses.title,
          imageSrc: courses.imageSrc,
          slug: courses.slug,
        })
        .from(courses)
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
