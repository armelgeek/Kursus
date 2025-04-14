import { createSearchParams } from '@/shared/domain/base.search-param';
import { BaseServiceImpl } from '@/shared/domain/base.service';
import { API_ENDPOINTS } from '@/shared/lib/config/api';
import type { Filter } from '@/shared/lib/types/filter';
import { Chapter, ChapterPayload } from '../config/chapter.type';

const chapterSearch = createSearchParams();
export class ChapterServiceImpl extends BaseServiceImpl<Chapter, ChapterPayload> {
  protected endpoints = API_ENDPOINTS.chapters;
  protected serializeParams(filter: Filter): string {
    return chapterSearch.serialize(filter);
  }
}
export const chapterService = new ChapterServiceImpl();