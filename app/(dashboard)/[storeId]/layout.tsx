import getCurrentUser from "@/actions/getCurrentUser";
import Navbar from "@/components/Navbar";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const store = await db.store.findFirst({
    where: { id: params.storeId, userId },
  });
  const currentUser = await getCurrentUser();

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <Navbar storeId={params.storeId} currentUser={currentUser} />
      {children}
    </>
  );
}
