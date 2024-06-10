import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { discountId: string } }
) {
  try {
    if (!params.discountId) {
      return new NextResponse("Discount id is required", { status: 400 });
    }

    const discount = await db.discount.findUnique({
      where: {
        id: params.discountId,
      },
      include: {
        products: true,
      },
    });

    return NextResponse.json(discount);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { discountId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.discountId) {
      return new NextResponse("Discount id is required", { status: 400 });
    }

    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const discount = await db.discount.delete({
      where: {
        id: params.discountId,
      },
    });

    return NextResponse.json(discount);
  } catch (error) {
    console.log("[Discount_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { discountId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, productId, percentage, endDate, startDate, isArchived } =
      body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    if (!productId) {
      return new NextResponse("Product id are required", { status: 400 });
    }
    if (percentage === undefined || percentage === null) {
      return new NextResponse("Percentage are required", { status: 400 });
    }

    if (!endDate) {
      return new NextResponse("endDate is required", { status: 400 });
    }
    if (!startDate) {
      return new NextResponse("startDate is required", { status: 400 });
    }

    if (!params.discountId) {
      return new NextResponse("Discount id is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const discount = await db.discount.update({
      where: {
        id: params.discountId,
      },
      data: {
        storeId: params.storeId,
        endDate,
        startDate,
        productId,
        name,
        isArchived,
        percentage,
      },
    });

    return NextResponse.json(discount);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
