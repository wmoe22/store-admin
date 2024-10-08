import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="font-bold text-3xl text-black dark:text-white">
            Welcome Back!
          </h1>
          <p className="text-base text-gray-400">
            Login or Create account to go to dashboard!
          </p>
        </div>
        <div className="flex items-center justify-center mt-8">
          <ClerkLoaded>
            <SignIn path="/sign-in" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground" />
          </ClerkLoading>
        </div>
      </div>

      <div className="h-full hidden relative lg:flex bg-blue-600 items-center justify-center">
        <Image
          src={"/image-3.svg"}
          className="object-cover object-center"
          fill
          alt="Logo"
        />
      </div>
    </div>
  );
}
