import { db } from "@/drizzle/db";
import { courses } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { cache } from "react";

export const getCourseById = cache(async (courseId: number) => {
    const data = await db.query.courses.findFirst({
        where: eq(courses.id, courseId),
        with: {
            units: {
                orderBy: (units, { asc }) => [asc(units.order)],
                with: {
                    lessons: {
                        orderBy: (lessons, { asc }) => [asc(lessons.order)],
                    },
                },
            },
        },
    });

    return data;
});
