import { db } from "@/drizzle/db";
import { lessons } from "@/drizzle/schema";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async () => {

  const data = await db.query.lessons.findMany();

  return NextResponse.json(data);
};

export const POST = async (req: NextRequest) => {

  const body = (await req.json()) as typeof lessons.$inferSelect;

  const data = await db
    .insert(lessons)
    .values({
      ...body,
    })
    .returning();

  return NextResponse.json(data[0]);
};
