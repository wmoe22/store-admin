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

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { label, imageUrl } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!label) return new NextResponse("Label is required", { status: 400 });

    if (!imageUrl) {
      return new NextResponse("Image is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const billboard = await db.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(
      { billboard },
      {
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.log("Billboards [Post] error", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const billboards = await db.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    });
    return NextResponse.json(
      { billboards },
      {
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.log("Billboards [GET] error", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
