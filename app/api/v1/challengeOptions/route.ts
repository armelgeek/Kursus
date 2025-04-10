import { db } from "@/drizzle/db";
import { challengeOptions } from "@/drizzle/schema/schema";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async () => {

  const data = await db.query.challengeOptions.findMany();

  return NextResponse.json(data);
};

export const POST = async (req: NextRequest) => {

  const body = (await req.json()) as typeof challengeOptions.$inferSelect;

  const data = await db
    .insert(challengeOptions)
    .values({
      ...body,
    })
    .returning();

  return NextResponse.json(data[0]);
};
