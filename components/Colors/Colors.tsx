import { ColorColumn } from "@/components/Colors/Columns";
import { Separator } from "../ui/separator";

import ColorInfo from "./ColorInfo";

const Colors = ({ colors }: { colors: ColorColumn[] }) => {
  return (
    <div className="flex min-h-screen w-full flex-col sm:bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <div className="p-7">
          <h1 className="font-bold text-4xl">Colors</h1>
          <p className="text-lg text-gray-500">Overview of store colors</p>
          <Separator className="mt-7" />
        </div>
        <ColorInfo colors={colors} />
      </div>
    </div>
  );
};

export default Colors;
