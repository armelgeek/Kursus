import { db } from "@/drizzle/db";
import { courses } from "@/drizzle/schema";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async () => {

  const data = await db.query.courses.findMany();

  return NextResponse.json(data);
};

export const POST = async (req: NextRequest) => {

  const body = (await req.json()) as typeof courses.$inferSelect;

  const data = await db
    .insert(courses)
    .values({
      ...body,
    })
    .returning();

  return NextResponse.json(data[0]);
};
