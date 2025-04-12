import { Filter } from "@/shared/lib/types/filter";
import { ChallengePayload } from "../../config/challenge.type";
import { challengeUseCase } from "./challenge.use-case";

export async function createChallenge(payload: ChallengePayload) {
    return challengeUseCase.create(payload);
}

export async function getChallenge(slug: string) {
    return challengeUseCase.getById(slug);
}

export async function updateChallenge(slug: string, payload: ChallengePayload) {
    return challengeUseCase.update(slug, payload);
}

export async function deleteChallenge(slug: string) {
    return challengeUseCase.delete(slug);
}

export async function getChallenges(filter: Filter) {
    return challengeUseCase.list(filter);
}