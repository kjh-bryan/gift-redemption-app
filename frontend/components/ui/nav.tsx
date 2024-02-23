"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import { LogoutButton } from "../auth/logout-button";
import { NavLink } from "../dashboard/side-nav-bar";

interface NavProps {
  isCollapsed: boolean;
  links: NavLink[];
}

export function Nav({ links, isCollapsed }: NavProps) {
  const pathName = usePathname();
  return (
    <TooltipProvider>
      <div
        data-collapsed={isCollapsed}
        className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2 "
      >
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map((link, index) =>
            isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  {link.title === "Logout" ? (
                    <LogoutButton
                      className={cn(
                        buttonVariants({
                          variant: link.href === pathName ? "default" : "ghost",
                          size: "icon",
                        }),
                        "h-9 w-9",
                        link.variant === "default" &&
                          "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                        link.title === "Logout" &&
                          "absolute bottom-10 text-align ml-auto mr-auto left-0 right-0",
                      )}
                    >
                      <link.icon className="h-4 w-4" />
                      <span className="sr-only">{link.title}</span>
                    </LogoutButton>
                  ) : (
                    <Link
                      href={link.href}
                      className={cn(
                        buttonVariants({
                          variant: link.href === pathName ? "default" : "ghost",
                          size: "icon",
                        }),
                        "h-9 w-9",
                        link.variant === "default" &&
                          "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                        link.title === "Logout" &&
                          "absolute bottom-10 text-align ml-auto mr-auto left-0 right-0",
                      )}
                    >
                      <link.icon className="h-4 w-4" />
                      <span className="sr-only">{link.title}</span>
                    </Link>
                  )}
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className={`flex items-center gap-4`}
                >
                  {link.title}
                  {link.label && (
                    <span className="ml-auto text-muted-foreground">
                      {link.label}
                    </span>
                  )}
                </TooltipContent>
              </Tooltip>
            ) : (
              <>
                {link.title === "Logout" ? (
                  <LogoutButton
                    key={index}
                    className={cn(
                      buttonVariants({
                        variant: link.href === pathName ? "default" : "ghost",
                        size: "sm",
                      }),
                      link.variant === "default" &&
                        "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                      "justify-start",
                      link.title === "Logout" &&
                        "absolute bottom-10 text-center ml-auto mr-auto",
                    )}
                  >
                    <link.icon className="mr-2 h-4 w-4" />
                    {link.title}
                    {link.label && (
                      <span
                        className={cn(
                          "ml-auto",
                          link.variant === "default" &&
                            "text-background dark:text-white",
                        )}
                      >
                        {link.label}
                      </span>
                    )}
                  </LogoutButton>
                ) : (
                  <Link
                    key={index}
                    href={link.href}
                    className={cn(
                      buttonVariants({
                        variant: link.href === pathName ? "default" : "ghost",
                        size: "sm",
                      }),
                      link.variant === "default" &&
                        "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                      "justify-start",
                      link.title === "Logout" &&
                        "absolute bottom-10 text-center ml-auto mr-auto",
                    )}
                  >
                    <link.icon className="mr-2 h-4 w-4" />
                    {link.title}
                    {link.label && (
                      <span
                        className={cn(
                          "ml-auto",
                          link.variant === "default" &&
                            "text-background dark:text-white",
                        )}
                      >
                        {link.label}
                      </span>
                    )}
                  </Link>
                )}
              </>
            ),
          )}
        </nav>
      </div>
    </TooltipProvider>
  );
}
