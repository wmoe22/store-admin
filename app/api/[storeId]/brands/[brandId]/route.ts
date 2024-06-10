import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Brand id is required", { status: 400 });
    }

    const brand = await db.brand.findUnique({
      where: { id: params.storeId },
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.log("[Brand_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; brandId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.brandId) {
      return new NextResponse("Brand id is required", { status: 400 });
    }

    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const brand = await db.brand.updateMany({
      where: { id: params.brandId },
      data: {
        name,
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.log("[Brand_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
    }

    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const size = await db.size.deleteMany({
      where: { id: params.sizeId },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[Size_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
