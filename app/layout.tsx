import ClientOnly from "@/components/ClientOnly";
import MobileMenu from "@/components/MobileMenu";
import Sidebar from "@/components/Sidebar/Sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SocketProvider } from "@/lib/providers/socket-provider";
import ToasterProvider from "@/lib/providers/toast-provider";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import getCurrentUser from "../actions/getCurrentUser";
import "./globals.css";

const font = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dash Admin Dashboard",
  description: "Fully Functional Admin Dashboard for E-commerce ",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClerkProvider>
          <ThemeProvider attribute="class" defaultTheme="system">
            <SocketProvider>
              <ClientOnly>
                <TooltipProvider>
                  <Sidebar currentUser={currentUser} />
                  <MobileMenu currentUser={currentUser} />
                  <ToasterProvider />
                  {children}
                </TooltipProvider>
              </ClientOnly>
            </SocketProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
