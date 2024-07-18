import { ColorColumn } from "@/components/Colors/Columns";

import ColorInfo from "./ColorInfo";

const Colors = ({ colors }: { colors: ColorColumn[] }) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-transparent">
      <div className="flex flex-col sm:gap-4 sm:py-3 sm:pl-16">
        <ColorInfo colors={colors} />
      </div>
    </div>
  );
};

export default Colors;
