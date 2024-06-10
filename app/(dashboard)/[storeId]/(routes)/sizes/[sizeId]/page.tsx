import CreateSizes from "@/components/Sizes/CreateSizes";
import db from "@/lib/db";

const SizePage = async ({ params }: { params: { sizeId: string } }) => {
  const size = await db.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return (
    <div>
      <CreateSizes initialData={size} />
    </div>
  );
};

export default SizePage;
