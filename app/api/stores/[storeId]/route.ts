import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, logoUrl } = body;

    if (!userId) {
      return new NextResponse("unauthenticated", { status: 401 });
    }

    if (!logoUrl) {
      return new NextResponse("LogoUrl is required", { status: 400 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const store = await db.store.updateMany({
      where: {
        id: params.storeId,
      },
      data: {
        name,
        logoUrl,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[Store Patch]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("unauthenticated", { status: 401 });
    }
    if (!params.storeId) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const store = await db.store.deleteMany({
      where: {
        id: params.storeId,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[Store Patch]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
