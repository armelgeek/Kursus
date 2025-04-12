import 'server-only';
import { eq, sql } from 'drizzle-orm';
import slugify from 'slugify';
import { db } from '@/drizzle/db';
import { units } from '@/drizzle/schema/unit';
import { Filter } from '@/shared/lib/types/filter';
import { calculatePagination } from '@/shared/lib/utils/calculate-pagination';
import { createPagination } from '@/shared/lib/utils/create-pagination';
import { filterOrderByClause } from '@/shared/lib/utils/filter-order-by-clause';
import { filterWhereClause } from '@/shared/lib/utils/filter-where-clause';
import { UseCase } from '@/shared/lib/use-cases';
import { Unit, UnitPayload } from '../../config/unit.type';
import { UnitFormSchema } from '../../config/unit.schema';
import { courses } from '@/drizzle/schema';

export const unitUseCase = new UseCase<Unit, UnitPayload, unknown>({
  name: 'Unit',
  schema: UnitFormSchema,
  operations: {
    async create(data: UnitPayload) {
      const slug = slugify(data.title, { lower: true });
      const existingUnit = await db.query.units.findFirst({
        where: eq(units.slug, slug),
      });
      
      if (existingUnit) {
        throw new Error('Unit with this name already exists');
      }
      const [unit] = await db
        .insert(units)
        .values({ ...data, slug })
        .returning();
        
      return unit;
    },
    
    async getById(slug: string) {
      const unit = await db.query.units.findFirst({
        where: eq(units.slug, slug)
      });
      return unit ?? null;
    },
    
    async update(slug: string, data: UnitPayload) {
      await db
        .update(units)
        .set({ ...data, updatedAt: sql`NOW()` })
        .where(eq(units.slug, slug));
      
      return { message: 'Unit updated successfully' };
    },
    
    async delete(slug: string) {
      await db
        .delete(units)
        .where(eq(units.slug, slug));
      
      return { message: 'Unit deleted successfully' };
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
        .from(units)
        .where(conditions);

      const { currentPage, itemsPerPage, offset } = calculatePagination(filter.page, filter.pageSize);
      const pagination = createPagination(count, currentPage, itemsPerPage, offset);

      const data = await db
        .select({
          id: units.id,
          title: units.title,
          slug: units.slug,
          description: units.description,
          order: units.order,
          createdAt: units.createdAt,
          updatedAt: units.updatedAt,
          course: {
            title: sql<string>`courses.title`,
          },
        })
        .from(units)
        .leftJoin(courses, eq(units.courseId, sql`courses.id`))
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
