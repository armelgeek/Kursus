import { Filter } from "@/shared/lib/types/filter";
import { UnitPayload } from "../../config/unit.type";
import { unitUseCase } from "./unit.use-case";

export async function createUnit(payload: UnitPayload) {
    return unitUseCase.create(payload);
}

export async function getUnit(slug: string) {
    return unitUseCase.getById(slug);
}

export async function updateUnit(slug: string, payload: UnitPayload) {
    return unitUseCase.update(slug, payload);
}

export async function deleteUnit(slug: string) {
    return unitUseCase.delete(slug);
}

export async function getUnits(filter: Filter) {
    return unitUseCase.list(filter);
}