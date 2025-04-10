import { db } from "@/drizzle/db";
import { units } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";


export const GET = async (
  _req: NextRequest,
  { params }: { params: { unitId: number } }
) => {

  const data = await db.query.units.findFirst({
    where: eq(units.id, params.unitId),
  });

  return NextResponse.json(data);
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { unitId: number } }
) => {

  const body = (await req.json()) as typeof units.$inferSelect;
  const data = await db
    .update(units)
    .set({
      ...body,
    })
    .where(eq(units.id, params.unitId))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  _req: NextRequest,
  { params }: { params: { unitId: number } }
) => {

  const data = await db
    .delete(units)
    .where(eq(units.id, params.unitId))
    .returning();

  return NextResponse.json(data[0]);
};
