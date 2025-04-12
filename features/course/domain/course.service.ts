import { createSearchParams } from '@/shared/domain/base.search-param';
import { BaseServiceImpl } from '@/shared/domain/base.service';
import { API_ENDPOINTS } from '@/shared/lib/config/api';
import type { Filter } from '@/shared/lib/types/filter';
import { Course, CoursePayload } from '../config/course.type';

const courseSearch = createSearchParams();
export class CourseServiceImpl extends BaseServiceImpl<Course, CoursePayload> {
  protected endpoints = API_ENDPOINTS.courses;
  protected serializeParams(filter: Filter): string {
    return courseSearch.serialize(filter);
  }
}
export const courseService = new CourseServiceImpl();