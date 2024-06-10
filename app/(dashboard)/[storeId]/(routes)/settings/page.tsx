import { Settings } from "@/components/Settings/Setting";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const SettingsPage = async ({ params }: { params: { storeId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  if (!store) {
    ("/");
  }
  return (
    <>
      <Settings initialData={store} />
    </>
  );
};

export default SettingsPage;
