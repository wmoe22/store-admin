import db from "@/lib/db";

const getStockCount = async (storeId: string) => {
  const stockCount = await db.product.count({
    where: {
      storeId,
      isArchived: true,
    },
  });

  return stockCount;
};

export default getStockCount;
