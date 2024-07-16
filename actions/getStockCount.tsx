import db from "@/lib/db";

const getStockCount = async (storeId: string) => {
  const stockCount = await db.product.count({
    where: {
      storeId,
      isArchived: false,
    },
  });

  return stockCount;
};

export default getStockCount;

export const getStockCountForPastPeriod = async (
  storeId: string
): Promise<number> => {
  const today = new Date();
  const daysAgo = new Date();
  daysAgo.setDate(daysAgo.getDate() - 30); // 30 days ago from today

  const stockCount = await db.product.count({
    where: {
      storeId,
      isArchived: false,
      createdAt: {
        gte: daysAgo,
        lt: today,
      },
    },
  });

  return stockCount;
};
