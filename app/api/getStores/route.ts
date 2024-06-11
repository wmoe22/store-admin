"use server";

import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { userId } = auth();

    console.log(userId);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const stores = await db.store.findMany({
      where: {
        userId,
      },
    });

    if (!stores || stores.length === 0) {
      return new NextResponse("No stores found", { status: 404 });
    }

    return NextResponse.json(stores);
  } catch (error) {
    console.log("getStores [GET] error", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
