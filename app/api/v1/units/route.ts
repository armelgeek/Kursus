import { db } from "@/drizzle/db";
import { units } from "@/drizzle/schema";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async () => {

  const data = await db.query.units.findMany();

  return NextResponse.json(data);
};

export const POST = async (req: NextRequest) => {

  const body = (await req.json()) as typeof units.$inferSelect;

  const data = await db
    .insert(units)
    .values({
      ...body,
    })
    .returning();

  return NextResponse.json(data[0]);
};
