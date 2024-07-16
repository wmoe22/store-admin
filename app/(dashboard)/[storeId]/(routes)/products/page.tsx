import { ProductColumn } from "@/components/Products/Columns";
import { Products } from "@/components/Products/Products";
import db from "@/lib/db";
import { formatter } from "@/lib/utils";
import { format } from "date-fns";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await db.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      images: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  /* @ts-ignore */
  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price.toNumber()),
    size: item.size.name,
    color: item.color.value,
    quantity: item.quantity,
    images: item.images.map((img) => img.url),
    category: item.category.name,
    createdAt: format(item.createdAt, "MMMM do , yyyy"),
  }));
  return (
    <>
      <Products products={formattedProducts} />
    </>
  );
};

export default ProductsPage;
