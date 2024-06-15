import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    if (!params.billboardId) {
      return new NextResponse("Billboard Id is required", { status: 400 });
    }

    const billboard = await db.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(
      { billboard },
      {
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.log("Billboard [GET] error", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    if (!params.billboardId) {
      return new NextResponse("Billboard Id is required", { status: 400 });
    }

    const { userId } = auth();

    const body = await req.json();

    const { label, imageUrl } = body;
    console.log(label, "label now");

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image url is required", { status: 400 });
    }

    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const billboard = await db.billboard.updateMany({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    console.log(billboard, "billboard now");

    return NextResponse.json(
      { billboard },
      {
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.log("Billboard [PATCH] error", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    if (!params.billboardId) {
      return new NextResponse("Billboard Id is required", { status: 400 });
    }
    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const billboard = await db.billboard.deleteMany({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(
      { billboard },
      {
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.log("Billboard delete", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
