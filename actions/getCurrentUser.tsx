"use server";

import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export default async function getCurrentUser() {
  try {
    const { userId } = auth();

    if (!userId) {
      return null;
    }

    const currentUser = await db.store.findFirst({
      where: {
        userId: userId,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error) {
    console.log(error);
  }
}
