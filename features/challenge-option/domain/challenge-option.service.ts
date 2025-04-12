import { createSearchParams } from '@/shared/domain/base.search-param';
import { BaseServiceImpl } from '@/shared/domain/base.service';
import { API_ENDPOINTS } from '@/shared/lib/config/api';
import type { Filter } from '@/shared/lib/types/filter';
import { ChallengeOption, ChallengeOptionPayload } from '../config/challenge-option.type';

const challengeOptionSearch = createSearchParams();
export class ChallengeOptionServiceImpl extends BaseServiceImpl<ChallengeOption, ChallengeOptionPayload> {
  protected endpoints = API_ENDPOINTS.challengeOptions;
  protected serializeParams(filter: Filter): string {
    return challengeOptionSearch.serialize(filter);
  }
}
export const challengeOptionService = new ChallengeOptionServiceImpl();