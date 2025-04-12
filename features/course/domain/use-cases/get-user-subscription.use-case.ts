import { db } from "@/drizzle/db";
import { DAY_IN_MS } from "@/shared/lib/constants/app.constant";
import { eq } from "drizzle-orm";
import { cache } from "react";
import { userSubscription } from '@/drizzle/schema/userSubscription';

export const getUserSubscription = cache(async (userId: string) => {

    if (!userId) return null;
  
    const data = await db.query.userSubscription.findFirst({
      where: eq(userSubscription.userId, userId),
    });
  
    if (!data) return null;
  
    const isActive =
      data.stripePriceId &&
      data.stripeCurrentPeriodEnd?.getTime() + DAY_IN_MS > Date.now();
  
    return {
      ...data,
      isActive: !!isActive,
    };
  });
  