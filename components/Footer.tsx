"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    const throttledScroll = () => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          handleScroll();
          timeoutId = null;
        }, 100);
      }
    };

    window.addEventListener("scroll", throttledScroll);
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      window.removeEventListener("scroll", throttledScroll);
    };
  }, []);

  const scrollToTop = () => {
    const duration = 800;
    const startPosition = window.scrollY;
    const startTime = performance.now();

    const easeOutCubic = (t: number): number => {
      return 1 - Math.pow(1 - t, 3);
    };

    const animateScroll = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easeProgress = easeOutCubic(progress);

      window.scrollTo(0, startPosition * (1 - easeProgress));

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#1C1D1F] text-slate-200 py-6 mt-auto">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* About section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Bright Mind</h3>
            <p className="text-xs text-slate-300">
              Empowering educators with resources, tools, and community to
              enhance teaching and learning experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/teacher/signup"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Teacher Registration
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Professional Development
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Community Forum
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="mailto:amumu72511@gmail.com"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-6">
          <p className="text-xs text-slate-400 text-center">
            © {currentYear} Bright Mind. All rights reserved.
          </p>
        </div>
      </div>

      <Button
        variant="default"
        size="icon"
        className={`fixed bottom-6 right-6 rounded-full shadow-lg transition-all duration-300 transform ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </footer>
  );
}
