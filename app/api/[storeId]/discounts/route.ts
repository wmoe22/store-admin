import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, productId, percentage, endDate, startDate, isArchived } =
      body;

    console.log("a");

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    console.log("b");

    if (
      !endDate ||
      !startDate ||
      !name ||
      !productId ||
      percentage === undefined ||
      percentage === null
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }
    console.log("c");

    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });
    console.log("d");

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    console.log("e");

    const discount = await db.discount.create({
      data: {
        storeId: params.storeId,
        endDate,
        startDate,
        name,
        isArchived,
        productId,
        percentage,
      },
    });
    console.log("f");

    return NextResponse.json(discount);
  } catch (error) {
    console.log("[DISCOUNTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const { storeId } = params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const storeByUserId = await db.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const discounts = await db.discount.findMany({
      where: {
        storeId,
      },

      include: {
        products: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(discounts);
  } catch (error) {
    console.log("[DISCOUNTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
