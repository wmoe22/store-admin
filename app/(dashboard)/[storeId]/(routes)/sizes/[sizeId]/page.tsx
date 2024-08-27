import CreateSizes from "@/components/Sizes/CreateSizes";
import db from "@/lib/db";

const SizePage = async ({ params }: { params: { sizeId: string } }) => {
  const size = await db.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return (
    <>
      <CreateSizes initialData={size} />
    </>
  );
};

export default SizePage;
