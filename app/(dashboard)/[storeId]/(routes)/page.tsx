import Dashboard from "@/components/Dashboard/Dashboard";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage = async ({ params }: DashboardPageProps) => {
  return (
    <>
      <Dashboard storeId={params.storeId} />
    </>
  );
};

export default DashboardPage;
