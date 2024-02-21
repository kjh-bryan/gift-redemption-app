"use client";

import React from "react";
import { Nav } from "@/components/ui/nav";

import {
  ChevronLeft,
  ChevronRight,
  Gift,
  LayoutDashboard,
  User,
  UsersRound,
} from "lucide-react";
import { useWindowWidth } from "@react-hook/window-size";
import { Button } from "@/components/ui/button";

export default function SideNavbar() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <div className="relative min-w-[80px] px-3 pb-10 pt-24">
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            variant="ghost"
            className="rounded-full p-2"
            onClick={toggleSidebar}
          >
            {isCollapsed && <ChevronRight />}
            {!isCollapsed && <ChevronLeft />}
          </Button>
        </div>
      )}

      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Dashboard",
            icon: LayoutDashboard,
            href: "/",
            variant: "default",
            role: "public",
          },
          {
            title: "Gifts",
            icon: Gift,
            href: "/gifts",
            variant: "ghost",
            role: "public",
          },
          {
            title: "Users",
            href: "/users",
            icon: User,
            variant: "ghost",
            role: "admin",
          },
          {
            title: "Teams",
            href: "/teams",
            icon: UsersRound,
            variant: "ghost",
            role: "admin",
          },
        ]}
      />
    </div>
  );
}
