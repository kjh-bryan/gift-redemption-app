import SideNavbar from "@/components/dashboard/side-nav-bar";
import { cn } from "@/lib/utils";
import React from "react";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "min-h-screen w-full bg-white text-black flex ",
        inter.className,
      )}
    >
      <SideNavbar />
      <div className="p-8 w-full">{children}</div>
    </div>
  );
};

export default ProtectedLayout;
