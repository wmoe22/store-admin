import CreateBillboards from "@/components/Billboards/CreateBillboards";
import db from "@/lib/db";

const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  const billboard = await db.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });
  return (
    <>
      <CreateBillboards initialData={billboard} />
    </>
  );
};

export default BillboardPage;
