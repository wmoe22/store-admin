import Brands from "@/components/Brands/Brands";
import { BrandColumn } from "@/components/Brands/Columns";
import db from "@/lib/db";
import { format } from "date-fns";

const BrandsPage = async ({ params }: { params: { storeId: string } }) => {
  const brands = await db.brand.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBrands: BrandColumn[] = brands.map((item) => ({
    id: item.id,
    name: item.name,
    logo: item.logo,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <>
      <Brands brands={formattedBrands} />
    </>
  );
};

export default BrandsPage;
