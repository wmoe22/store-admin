import db from "@/lib/db";

const getRecentOrders = async (storeId: string, limit: number = 5) => {
  const recentOrders = await db.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  return recentOrders;
};

export default getRecentOrders;
