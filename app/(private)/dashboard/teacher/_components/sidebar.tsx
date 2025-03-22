"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  BarChart2,
  MessageSquare,
  Settings,
  Layout,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
const navItems = [
  { href: "/dashboard/teacher", icon: Layout, label: "Dashboard" },
  { href: "/dashboard/teacher/courses", icon: BookOpen, label: "Courses" },
  {
    href: "/dashboard/teacher/transactions",
    icon: DollarSign,
    label: "transactions",
  },
  { href: "/dashboard/teacher/progress", icon: BarChart2, label: "Progress" },
  {
    href: "/dashboard/teacher/comments",
    icon: MessageSquare,
    label: "Comments",
  },
  {
    href: "/dashboard/teacher/issues",
    icon: HelpCircle,
    label: "Issues",
  },
  { href: "/dashboard/teacher/settings", icon: Settings, label: "Settings" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "bg-background border-r transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4">
          {!collapsed && <h2 className="text-2xl font-semibold">Teacher</h2>}
          <Button variant="ghost" size="icon" onClick={onToggle}>
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
        <nav className="flex-1 space-y-2 p-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-2 py-2 px-4 rounded transition duration-200",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                collapsed && "justify-center"
              )}
            >
              <item.icon className="h-5 w-5" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
