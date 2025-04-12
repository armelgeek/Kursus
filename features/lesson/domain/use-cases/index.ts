import { Filter } from "@/shared/lib/types/filter";
import { LessonPayload } from "../../config/lesson.type";
import { lessonUseCase } from "./lesson.use-case";

export async function createLesson(payload: LessonPayload) {
    return lessonUseCase.create(payload);
}

export async function getLesson(slug: string) {
    return lessonUseCase.getById(slug);
}

export async function updateLesson(slug: string, payload: LessonPayload) {
    return lessonUseCase.update(slug, payload);
}

export async function deleteLesson(slug: string) {
    return lessonUseCase.delete(slug);
}

export async function getLessons(filter: Filter) {
    return lessonUseCase.list(filter);
}