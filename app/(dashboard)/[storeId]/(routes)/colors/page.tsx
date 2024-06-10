import Colors from "@/components/Colors/Colors";
import { ColorColumn } from "@/components/Colors/Columns";
import db from "@/lib/db";
import { format } from "date-fns";

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
  const colors = await db.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <>
      <Colors colors={formattedColors} />
    </>
  );
};

export default ColorsPage;
