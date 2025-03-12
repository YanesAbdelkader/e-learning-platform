"use client"

import { useState, useEffect } from "react"
import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sidebar } from "./_components/sidebar"
import { Header } from "./_components/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true)

    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setIsCollapsed(true)
      }
    }

    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)

    return () => {
      window.removeEventListener("resize", checkIsMobile)
    }
  }, [])

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileOpen(!isMobileOpen)
    } else {
      setIsCollapsed(!isCollapsed)
    }
  }

  if (!isMounted) {
    return null
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen bg-background">
        {/* Desktop Sidebar */}
        {!isMobile && <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />}

        {/* Mobile Sidebar (Sheet) */}
        {isMobile && (
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetContent side="left" className="p-0 w-[280px]">
              <Sidebar isCollapsed={false} toggleSidebar={() => setIsMobileOpen(false)} isMobile={true} />
            </SheetContent>
          </Sheet>
        )}

        <div
          className={cn(
            "min-h-screen transition-all duration-300",
            isMobile ? "ml-0" : isCollapsed ? "ml-[70px]" : "ml-[240px]",
          )}
        >
          <Header>
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            )}
          </Header>
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  )
}

