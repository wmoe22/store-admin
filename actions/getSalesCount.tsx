import db from "@/lib/db";

const getSalesCount = async (storeId: string) => {
  const salesCount = await db.order.count({
    where: {
      storeId,
      isPaid: true,
    },
  });

  return salesCount;
};

export default getSalesCount;

export const getSalesCountForPastPeriod = async (storeId: string) => {
  const today = new Date();
  const daysAgo = new Date();
  daysAgo.setDate(daysAgo.getDate() - 30); // 30 days ago from today
  const salesCount = await db.order.count({
    where: {
      storeId,
      isPaid: true,
      createdAt: {
        gte: daysAgo,
        lt: today,
      },
    },
  });

  return salesCount;
};
