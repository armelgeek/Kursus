import { Filter } from "@/shared/lib/types/filter";
import { CoursePayload } from "../../config/course.type";
import { courseUseCase } from "./course.use-case";

export async function createCourse(payload: CoursePayload) {
    return courseUseCase.create(payload);
}

export async function getCourse(slug: string) {
    return courseUseCase.getById(slug);
}

export async function updateCourse(slug: string, payload: CoursePayload) {
    return courseUseCase.update(slug, payload);
}

export async function deleteCourse(slug: string) {
    return courseUseCase.delete(slug);
}

export async function getCourses(filter: Filter) {
    return courseUseCase.list(filter);
}