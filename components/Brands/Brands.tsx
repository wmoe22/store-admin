import BrandInfo from "./BrandInfo";
import { BrandColumn } from "./Columns";

const Brands = ({ brands }: { brands: BrandColumn[] }) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-transparent">
      <div className="flex flex-col sm:gap-4 sm:py-3 sm:pl-16">
        <BrandInfo brands={brands} />
      </div>
    </div>
  );
};

export default Brands;
