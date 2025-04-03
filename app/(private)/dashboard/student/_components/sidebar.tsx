"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  HelpCircle,
  Home,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const routes = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    label: "Transactions",
    icon: CreditCard,
    href: "/dashboard/student/transactions",
  },
  {
    label: "Issues",
    icon: HelpCircle,
    href: "/dashboard/student/issues",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/student/settings",
  },
];

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  isMobile?: boolean;
}

export function Sidebar({
  isCollapsed,
  toggleSidebar,
  isMobile = false,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "h-full bg-background border-r transition-all duration-300 flex flex-col",
        isMobile
          ? "w-full"
          : isCollapsed
          ? "w-[70px] fixed top-0 left-0 z-30 h-screen"
          : "w-[240px] fixed top-0 left-0 z-30 h-screen"
      )}
    >
      <div className="px-3 py-4 flex-1 flex flex-col h-full">
        <div className="flex items-center mb-10">
          {/* Logo */}
          <Link
            href="/dashboard"
            className={cn(
              "flex items-center",
              isCollapsed && !isMobile
                ? "justify-center px-0 mr-0"
                : "px-0 mr-auto"
            )}
          >
            {(!isCollapsed || isMobile) && (
              <h1 className="text-xl font-bold ml-2">Student</h1>
            )}
          </Link>

          {/* Toggle button at the top */}
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="ml-auto"
            >
              {isCollapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
              <span className="sr-only">
                {isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              </span>
            </Button>
          )}
        </div>

        <div className="space-y-1 flex-1 overflow-y-auto">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex p-3 w-full font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                pathname === route.href
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground",
                isCollapsed && !isMobile ? "justify-center" : "justify-start"
              )}
              onClick={isMobile ? toggleSidebar : undefined}
            >
              <route.icon className="h-5 w-5" />
              {(!isCollapsed || isMobile) && (
                <span className="ml-3">{route.label}</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
