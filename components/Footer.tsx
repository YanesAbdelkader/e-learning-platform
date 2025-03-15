"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const slowScrollToTop = () => {
    const scrollStep = window.scrollY / 50;

    const scrollAnimation = () => {
      if (window.scrollY > 0) {
        window.scrollBy(0, -scrollStep);
        requestAnimationFrame(scrollAnimation);
      }
    };

    requestAnimationFrame(scrollAnimation);
  };

  return (
    <footer className="w-full bg-[#1C1D1F] px-6 py-6 mt-auto relative">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
          <p className="text-sm text-slate-200">
            © 2025 TeacherPortal. All rights reserved.
          </p>
        </div>
      </div>
      <Button
        variant="default"
        size="icon"
        className={`fixed bottom-3 right-4 rounded-full border transition-opacity duration-500 ${
          isVisible ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={slowScrollToTop}
        title="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </footer>
  );
}
