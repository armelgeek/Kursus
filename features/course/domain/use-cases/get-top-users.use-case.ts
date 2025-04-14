import { db } from "@/drizzle/db";
import { cache } from "react";

export const getTopUsers = cache(async (userId: string | null) => {

    if (!userId) return [];

    const data = await db.query.userProgress.findMany({
        orderBy: (userProgress, { desc }) => [desc(userProgress.points)],
        limit: 10,
        columns: {
            userId: true,
            userName: true,
            userImageSrc: true,
            points: true,
        },
    });

    return data;
});