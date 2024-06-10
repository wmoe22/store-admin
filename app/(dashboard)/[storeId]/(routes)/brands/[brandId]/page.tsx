import CreateBrands from "@/components/Brands/CreateBrands";
import db from "@/lib/db";

const BrandPage = async ({ params }: { params: { brandId: string } }) => {
  const brand = await db.brand.findUnique({
    where: {
      id: params.brandId,
    },
  });
  return (
    <div>
      <CreateBrands initialData={brand} />
    </div>
  );
};

export default BrandPage;
