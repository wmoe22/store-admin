import CreateDiscounts from "@/components/Discounts/CreateDiscount";
import db from "@/lib/db";

const DiscountPage = async ({
  params,
}: {
  params: { storeId: string; discountId: string };
}) => {
  const discount = await db.discount.findUnique({
    where: {
      id: params.discountId,
    },
  });

  const products = await db.product.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  console.log(discount, "discount");

  return (
    <div>
      <CreateDiscounts initialData={discount} products={products} />
    </div>
  );
};

export default DiscountPage;
