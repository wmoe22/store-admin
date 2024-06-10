import CreateColors from "@/components/Colors/CreateColors";
import db from "@/lib/db";

const ColorPage = async ({ params }: { params: { colorId: string } }) => {
  const color = await db.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return (
    <div>
      <CreateColors initialData={color} />
    </div>
  );
};

export default ColorPage;
