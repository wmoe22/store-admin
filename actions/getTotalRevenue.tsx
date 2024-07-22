import db from "@/lib/db";

const getTotalRevenue = async (storeId: string) => {
  const paidOrders = await db.order.findMany({
    where: {
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

  const totalRevenue = paidOrders.reduce((total, order) => {
    const orderTotal = order.orderItems.reduce((orderSum, item) => {
      return orderSum + item.product.price.toNumber();
    }, 0);

    return total + orderTotal;
  }, 0);

  return totalRevenue;
};

export default getTotalRevenue;

export const getTotalRevenueForPastPeriod = async (
  storeId: string,
  days: number
) => {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - days);

  const previousStartDate = new Date(startDate);
  previousStartDate.setDate(startDate.getDate() - days);

  const paidOrdersCurrent = await db.order.findMany({
    where: {
      storeId,
      isPaid: true,
      createdAt: {
        gte: startDate,
        lt: today,
      },
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const paidOrdersPrevious = await db.order.findMany({
    where: {
      storeId,
      isPaid: true,
      createdAt: {
        gte: previousStartDate,
        lt: startDate,
      },
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const currentRevenue = calculateTotalRevenue(paidOrdersCurrent);

  const previousRevenue = calculateTotalRevenue(paidOrdersPrevious);

  const percentageChange = calculatePercentageChange(
    currentRevenue,
    previousRevenue
  );

  return {
    currentRevenue,
    previousRevenue,
    percentageChange,
  };
};

const calculateTotalRevenue = (paidOrders: any[]) => {
  return paidOrders.reduce((total, order) => {
    const orderTotal = order.orderItems.reduce((orderSum: any, item: any) => {
      return orderSum + item.product.price.toNumber();
    }, 0);

    return total + orderTotal;
  }, 0);
};

export const calculatePercentageChange = (
  currentValue: number,
  previousValue: number
) => {
  if (previousValue === 0) {
    return 0;
  }

  const percentageChange =
    ((currentValue - previousValue) / previousValue) * 100;
  return parseFloat(percentageChange.toFixed(2));
};
