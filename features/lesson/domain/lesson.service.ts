import { createSearchParams } from '@/shared/domain/base.search-param';
import { BaseServiceImpl } from '@/shared/domain/base.service';
import { API_ENDPOINTS } from '@/shared/lib/config/api';
import type { Filter } from '@/shared/lib/types/filter';
import { Lesson, LessonPayload } from '../config/lesson.type';

const lessonSearch = createSearchParams();
export class LessonServiceImpl extends BaseServiceImpl<Lesson, LessonPayload> {
  protected endpoints = API_ENDPOINTS.lessons;
  protected serializeParams(filter: Filter): string {
    return lessonSearch.serialize(filter);
  }
}
export const lessonService = new LessonServiceImpl();