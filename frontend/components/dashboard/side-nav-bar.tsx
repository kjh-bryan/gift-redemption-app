"use client";

import React, { useEffect, useState } from "react";
import { Nav } from "@/components/ui/nav";

import {
  ChevronLeft,
  ChevronRight,
  Gift,
  LayoutDashboard,
  LogOut,
  LucideIcon,
  User,
  UsersRound,
} from "lucide-react";
import { useWindowWidth } from "@react-hook/window-size";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SideNavProfile from "./side-nav-bar-profile";
import { useSession } from "next-auth/react";

export type NavLink = {
  title: string;
  label?: string;
  icon: LucideIcon;
  variant: "default" | "ghost";
  href: string;
  role: string;
};

const initialLinks: NavLink[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
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
    title: "Logout",
    href: "/logout",
    icon: LogOut,
    variant: "ghost",
    role: "public",
  },
];

export default function SideNavbar() {
  const [links, setLinks] = useState<NavLink[]>(initialLinks);

  const session = useSession();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    if (session.data) {
      if (session.data.user.role_name === "ADMIN") {
        setLinks([
          {
            title: "Dashboard",
            icon: LayoutDashboard,
            href: "/dashboard",
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
            title: "Logout",
            href: "api/auth/logout",
            icon: LogOut,
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
        ]);
      }
    }
  }, [session.data]);
  return (
    <div className={cn("relative min-w-[80px] px-3 pb-10 pt-8")}>
      <div
        className={cn(
          "flex h-[52px] items-center justify-center px-4",
          isCollapsed ? "h-[52px]" : "px-2",
        )}
      >
        {session.data && (
          <SideNavProfile
            staff_pass_id={session.data.user.username}
            team_name={session.data.user.team_name}
            role_name={session.data.user.role_name}
            isCollapsed={isCollapsed}
          />
        )}
      </div>
      <Nav isCollapsed={mobileWidth ? true : isCollapsed} links={links} />
    </div>
  );
}
