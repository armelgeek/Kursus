import { Filter } from "@/shared/lib/types/filter";
import { ChapterPayload } from "../../config/chapter.type";
import { chapterUseCase } from "./chapter.use-case";

export async function createChapter(payload: ChapterPayload) {
    return chapterUseCase.create(payload);
}

export async function getChapter(slug: string) {
    return chapterUseCase.getById(slug);
}

export async function updateChapter(slug: string, payload: ChapterPayload) {
    return chapterUseCase.update(slug, payload);
}

export async function deleteChapter(slug: string) {
    return chapterUseCase.delete(slug);
}

export async function getChapters(filter: Filter) {
    return chapterUseCase.list(filter);
}