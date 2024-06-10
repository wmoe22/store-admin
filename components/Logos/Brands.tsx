import { Separator } from "../ui/separator";
import BrandInfo from "./BrandInfo";
import { BrandColumn } from "./Columns";

const Brands = ({ brands }: { brands: BrandColumn[] }) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <div className="p-7">
          <h1 className="font-bold text-4xl">Brands</h1>
          <p className="text-lg text-gray-500">Overview of store brands</p>
          <Separator className="mt-7" />
        </div>
        <BrandInfo brands={brands} />
      </div>
    </div>
  );
};

export default Brands;
