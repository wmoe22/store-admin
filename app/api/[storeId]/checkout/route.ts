import db from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const coresHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: coresHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { productIds, cartItems } = await req.json();

    if (!productIds || productIds.length === 0) {
      return new NextResponse("Product ids are required", { status: 400 });
    }

    const item = cartItems.map((item: any) => item);
    const products = await db.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    products.forEach((product) => {
      line_items.push({
        quantity: item.quantity,
        price_data: {
          currency: "USD",
          product_data: {
            name: product.name,
          },
          unit_amount: product.price.toNumber() * 100,
        },
      });
    });

    const order = await db.order.create({
      data: {
        storeId: params.storeId,
        isPaid: false,
        orderItems: {
          create: productIds.map((productId: string) => ({
            product: {
              connect: {
                id: productId,
              },
            },
          })),
        },
      },
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${process.env.FRONTEND_STORE_URL}/?success=1`,
      cancel_url: `${process.env.FRONTEND_STORE_URL}/?cancel=1`,
      metadata: {
        orderId: order.id,
      },
    });

    return NextResponse.json(
      { url: session.url },
      {
        headers: coresHeaders,
      }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "An unexpected error occurred" }),
      {
        status: 500,
        headers: coresHeaders,
      }
    );
  }
}
