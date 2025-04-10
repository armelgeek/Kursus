import { db } from "@/drizzle/db";
import { cache } from "react";

export const getCourses = cache(async () => {
    const data = await db.query.courses.findMany();
  
    return data;
  });
  