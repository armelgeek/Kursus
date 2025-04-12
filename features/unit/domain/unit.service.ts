import { createSearchParams } from '@/shared/domain/base.search-param';
import { BaseServiceImpl } from '@/shared/domain/base.service';
import { API_ENDPOINTS } from '@/shared/lib/config/api';
import type { Filter } from '@/shared/lib/types/filter';
import { Unit, UnitPayload } from '../config/unit.type';

const unitSearch = createSearchParams();
export class UnitServiceImpl extends BaseServiceImpl<Unit, UnitPayload> {
  protected endpoints = API_ENDPOINTS.units;
  protected serializeParams(filter: Filter): string {
    return unitSearch.serialize(filter);
  }
}
export const unitService = new UnitServiceImpl();