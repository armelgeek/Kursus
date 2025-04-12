import { db } from "@/drizzle/db";
import { userProgress } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { cache } from "react";

export const getUserProgress = cache(async (userId: string | null) => {
    const data = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true,
        },
    });

    return data;
});

