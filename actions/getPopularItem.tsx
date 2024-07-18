import db from "@/lib/db";

interface PopularItem {
  productId: string;
  count: number;
}
const getPopularItems = async (storeId: string, time: number) => {
  const daysAgo = new Date();
  /* 30days ago */
  daysAgo.setDate(daysAgo.getDate() - time);

  const paidOrders = await db.order.findMany({
    where: {
      storeId,
      isPaid: true,
      createdAt: {
        gte: daysAgo,
      },
    },
    include: {
      orderItems: true,
    },
  });

  const productsCount: { [productId: string]: number } = {};
  for (const order of paidOrders) {
    for (const item of order.orderItems) {
      const productId = item.productId;
      if (productId in productsCount) {
        productsCount[productId]++;
      } else {
        productsCount[productId] = 1;
      }
    }
  }

  const popularItems: PopularItem[] = Object.keys(productsCount).map(
    (productId) => ({
      productId,
      count: productsCount[productId],
    })
  );
  popularItems.sort((a, b) => b.count - a.count);

  return popularItems;
};

export default getPopularItems;
