import { SizeColumn } from "./Columns";
import SizesInfo from "./SizesInfo";

const Sizes = ({ sizes }: { sizes: SizeColumn[] }) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-transparent">
      <div className="flex flex-col sm:gap-4 sm:py-3 sm:pl-16">
        <SizesInfo sizes={sizes} />
      </div>
    </div>
  );
};

export default Sizes;
