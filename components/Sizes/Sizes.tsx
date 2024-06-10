import { Separator } from "../ui/separator";
import { SizeColumn } from "./Columns";
import SizesInfo from "./SizesInfo";

const Sizes = ({ sizes }: { sizes: SizeColumn[] }) => {
  return (
    <div className="flex min-h-screen w-full flex-col ">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <div className="p-7">
          <h1 className="font-bold text-4xl">Sizes</h1>
          <p className="text-lg text-gray-500">Overview of sizes</p>
          <Separator className="mt-7" />
        </div>
        <SizesInfo sizes={sizes} />
      </div>
    </div>
  );
};

export default Sizes;
