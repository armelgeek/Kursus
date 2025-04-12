import { Filter } from "@/shared/lib/types/filter";
import { ChallengeOptionPayload } from "../../config/challenge-option.type";
import { challengeOptionUseCase } from "./challenge-option.use-case";

export async function createChallengeOption(payload: ChallengeOptionPayload) {
    return challengeOptionUseCase.create(payload);
}

export async function getChallengeOption(slug: string) {
    return challengeOptionUseCase.getById(slug);
}

export async function updateChallengeOption(slug: string, payload: ChallengeOptionPayload) {
    return challengeOptionUseCase.update(slug, payload);
}

export async function deleteChallengeOption(slug: string) {
    return challengeOptionUseCase.delete(slug);
}

export async function getChallengeOptions(filter: Filter) {
    return challengeOptionUseCase.list(filter);
}