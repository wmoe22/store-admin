import { DiscountColumn } from "@/components/Discounts/Columns";
import Discounts from "@/components/Discounts/Discounts";
import db from "@/lib/db";
import { format } from "date-fns";

const DiscountPage = async ({ params }: { params: { storeId: string } }) => {
  const discounts = await db.discount.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      products: true,
    },
  });

  const productIds = discounts.map((item) => item.productId);

  const products = await db.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedDiscounts: DiscountColumn[] = discounts.map((item) => ({
    id: item.id,
    name: item.name,
    percentage: item.percentage,
    endDate: format(item.endDate, "MMMM do, yyyy"),
    product: products.map((item) => item.name),
    isArchived: item.isArchived,
    startDate: format(item.startDate, "MMMM do, yyyy"),
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <>
      <Discounts discounts={formattedDiscounts} />
    </>
  );
};

export default DiscountPage;
