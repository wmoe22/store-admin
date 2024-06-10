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
    <div>
      <div>
        <CreateBillboards initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
