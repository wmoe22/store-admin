"use server";

import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId } = auth();

    const { name, logoUrl } = body;

    console.log(userId, "user");

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name required", { status: 400 });
    }

    const store = await db.store.create({
      data: {
        name,
        logoUrl,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("Store Post", error);
    return new NextResponse("Internal server [stores post] error", {
      status: 500,
    });
  }
}
