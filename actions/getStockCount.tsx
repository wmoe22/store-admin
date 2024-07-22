import db from "@/lib/db";

const getVarietyCount = async (storeId: string) => {
  const varietyCount = await db.product.count({
    where: {
      storeId,
      isArchived: false,
    },
  });

  return varietyCount;
};

export default getVarietyCount;

export const getVarietyCountForTimePeriod = async (
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
export const getStockCount = async (storeId: string) => {
  // Fetch all products that are not archived
  const products = await db.product.findMany({
    where: {
      storeId,
      isArchived: false,
    },
    select: {
      quantity: true,
    },
  });

  const totalStockCount = products.reduce(
    (total, product) => total + (product.quantity || 0),
    0
  );

  return totalStockCount;
};

export const getStockCountForTimePeriod = async (
  storeId: string
): Promise<number> => {
  const today = new Date();
  const daysAgo = new Date();
  daysAgo.setDate(daysAgo.getDate() - 30); // 30 days ago from today

  const products = await db.product.findMany({
    where: {
      storeId,
      isArchived: false,
      createdAt: {
        gte: daysAgo,
        lt: today,
      },
    },
    select: {
      quantity: true,
    },
  });

  const totalStockCount = products.reduce(
    (total, product) => total + (product.quantity || 0),
    0
  );

  return totalStockCount;
};
