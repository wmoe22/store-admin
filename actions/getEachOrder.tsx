import db from "@/lib/db";

const getOrderDetails = async ({
  orderId,
  storeId,
}: {
  orderId: string;
  storeId: string;
}) => {
  const order = await db.order.findMany({
    where: {
      id: orderId,
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  return order;
};

export default getOrderDetails;
