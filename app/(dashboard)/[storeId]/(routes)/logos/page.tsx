import Billboards from "@/components/Billboards/Billboards";
import db from "@/lib/db";

const BillboardPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await db.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <>
      <Billboards billboards={billboards} />
    </>
  );
};

export default BillboardPage;
