import CreateProducts from "@/components/Products/CreateProducts";
import db from "@/lib/db";

const ProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  const product = await db.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await db.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const sizes = await db.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const colors = await db.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const brands = await db.brand.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <>
      <CreateProducts
        categories={categories}
        colors={colors}
        sizes={sizes}
        brands={brands}
        initialData={product}
      />
    </>
  );
};

export default ProductPage;
