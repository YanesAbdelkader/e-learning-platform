"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, BookOpen, DollarSign, AlertCircle, FolderTree, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Dashboard", href: "/dashboard/admin", icon: Home },
  { name: "Teachers", href: "/dashboard/admin/teachers", icon: Users },
  { name: "Content", href: "/dashboard/admin/content", icon: BookOpen },
  { name: "Categories", href: "/dashboard/admin/categories", icon: FolderTree },
  { name: "Transactions", href: "/dashboard/admin/transactions", icon: DollarSign },
  { name: "Issues", href: "/dashboard/admin/issues", icon: AlertCircle },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isMinimized, setIsMinimized] = useState(false)

  return (
    <aside
      className={`bg-background border-r border-border transition-all duration-300 ${isMinimized ? "w-16" : "w-64"}`}
    >
      <div className="flex justify-end p-2">
        <Button variant="ghost" size="icon" onClick={() => setIsMinimized(!isMinimized)}>
          {isMinimized ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      <nav className="mt-5 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="mr-3 h-6 w-6" />
              {!isMinimized && <span>{item.name}</span>}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

