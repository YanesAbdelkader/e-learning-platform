"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Clock,
  Award,
  ChevronLeft,
  ChevronRight,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "All Courses", href: "/mycourses", icon: Youtube },
  { name: "In Progress", href: "/mycourses/in-progress", icon: Clock },
  { name: "Completed", href: "/mycourses/completed", icon: Award },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <aside
      className={`bg-background border-r border-border transition-all duration-300 ease-in-out ${
        isMinimized ? "w-16" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4">
        {!isMinimized && <h2 className="text-2xl font-semibold">Navbar</h2>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMinimized(!isMinimized)}
        >
          {isMinimized ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="mt-5 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-2 py-2 px-4 rounded transition duration-200 ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="mr-3 h-6 w-6" />
              {!isMinimized && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
