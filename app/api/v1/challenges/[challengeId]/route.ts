import { db } from "@/drizzle/db";
import { challenges } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

export const GET = async (
  _req: NextRequest,
  { params }: { params: { challengeId: number } }
) => {

  const data = await db.query.challenges.findFirst({
    where: eq(challenges.id, params.challengeId),
  });

  return NextResponse.json(data);
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { challengeId: number } }
) => {
 
  const body = (await req.json()) as typeof challenges.$inferSelect;
  const data = await db
    .update(challenges)
    .set({
      ...body,
    })
    .where(eq(challenges.id, params.challengeId))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  _req: NextRequest,
  { params }: { params: { challengeId: number } }
) => {

  const data = await db
    .delete(challenges)
    .where(eq(challenges.id, params.challengeId))
    .returning();

  return NextResponse.json(data[0]);
};
