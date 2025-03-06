"use client"

import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Footer() {
  const scrollToTop = () => {
    const scrollStep = window.scrollY / 50;
    const scrollInterval = setInterval(() => {
      if (window.scrollY === 0) {
        clearInterval(scrollInterval);
      } else {
        window.scrollBy(0, -scrollStep);
      }
    }, 10);
  }

  return (
    <footer className="w-full bg-[#1C1D1F] px-6 py-4 mt-auto">
      <div className="mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left max-w-[1340px]">
        <Link href="/" className="flex items-center gap-2 text-white mb-2 md:mb-0">
          {/* Simple logo shape */}
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-600">
            <span className="font-bold">A-Z</span>
          </div>
          <span className="text-lg font-semibold">A-Z Learning</span>
        </Link>
        <span className="text-sm text-white/80">© 2025 A-Z Learning, Inc.</span>
      </div>
      <Button
        variant="default"
        size="icon"
        className="fixed bottom-3 border right-4 rounded-full"
        onClick={scrollToTop}
        title="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </footer>
  )
}
