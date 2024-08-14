import db from "@/lib/db";
import { calculatePercentageChange } from "@/lib/utils";

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

export const getAllSales = async (storeId: string) => {
  const sales = await db.order.findMany({
    where: {
      storeId: storeId,
    },

    orderBy: {
      createdAt: "desc",
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });
  return sales;
};

export const getSalesCountForPastPeriod = async (
  storeId: string,
  days: number
) => {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - days);

  const previousStartDate = new Date(startDate);
  previousStartDate.setDate(startDate.getDate() - days);
  const salesCountCurrent = await db.order.count({
    where: {
      storeId,
      isPaid: true,
      createdAt: {
        gte: startDate,
        lt: today,
      },
    },
  });

  // Fetch sales count for previous period
  const salesCountPrevious = await db.order.count({
    where: {
      storeId,
      isPaid: true,
      createdAt: {
        gte: previousStartDate,
        lt: startDate,
      },
    },
  });

  // Calculate percentage change in sales count
  const percentageChangeSalesCount = calculatePercentageChange(
    salesCountCurrent,
    salesCountPrevious
  );

  return {
    salesCountCurrent,
    salesCountPrevious,
    percentageChangeSalesCount,
  };
};
