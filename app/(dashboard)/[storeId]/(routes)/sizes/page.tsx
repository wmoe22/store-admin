import { SizeColumn } from "@/components/Sizes/Columns";
import Sizes from "@/components/Sizes/Sizes";
import db from "@/lib/db";
import { format } from "date-fns";

const SizePage = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await db.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <>
      <Sizes sizes={formattedSizes} />
    </>
  );
};

export default SizePage;
