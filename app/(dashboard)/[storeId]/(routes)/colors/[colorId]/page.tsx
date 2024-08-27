import CreateColors from "@/components/Colors/CreateColors";
import db from "@/lib/db";

const ColorPage = async ({ params }: { params: { colorId: string } }) => {
  const color = await db.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return (
    <>
      <CreateColors initialData={color} />
    </>
  );
};

export default ColorPage;
