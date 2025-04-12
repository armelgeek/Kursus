import { createSearchParams } from '@/shared/domain/base.search-param';
import { BaseServiceImpl } from '@/shared/domain/base.service';
import { API_ENDPOINTS } from '@/shared/lib/config/api';
import type { Filter } from '@/shared/lib/types/filter';
import { Challenge, ChallengePayload } from '../config/challenge.type';

const challengeSearch = createSearchParams();
export class ChallengeServiceImpl extends BaseServiceImpl<Challenge, ChallengePayload> {
  protected endpoints = API_ENDPOINTS.challenges;
  protected serializeParams(filter: Filter): string {
    return challengeSearch.serialize(filter);
  }
}
export const challengeService = new ChallengeServiceImpl();