"use client";

import { Button } from "@/components/ui/button";
import { Clock,ArrowRight} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/header";

export default function TeacherVerificationPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <Header/>

      {/* Main Content */}
      <main className="container flex flex-1 px-4 py-8 md:px-6 md:py-12">
        <div className="grid w-full gap-8 md:grid-cols-5 lg:gap-12">
          {/* Left Column - Status */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-xl border bg-card p-6 shadow-sm md:p-8">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 md:h-16 md:w-16">
                  <Clock className="h-6 w-6 text-primary md:h-8 md:w-8" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                    Verification in Progress
                  </h1>
                  <p className="text-muted-foreground">
                    Your teacher account is being reviewed
                  </p>
                </div>
              </div>

              <div className="mb-6 space-y-4">
                <div className="relative h-2 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="absolute left-0 top-0 h-full w-1/3 bg-primary"
                    initial={{ x: "-100%" }}
                    animate={{ x: "300%" }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 2,
                      ease: "linear",
                    }}
                  />
                </div>

                <p className="text-muted-foreground">
                  Our team is reviewing your credentials. You&apos;ll receive a
                  notification once your account is verified, typically within
                  24-48 hours.
                </p>
              </div>

              <div className="flex flex-col justify-end gap-4 sm:flex-row">
                <Link href="/" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full gap-2">
                    Return to Home
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Info */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="rounded-xl border bg-card p-6 shadow-sm md:p-8">
              <h2 className="mb-4 text-xl font-semibold">What happens next?</h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium">Credential Review</h3>
                    <p className="text-sm text-muted-foreground">
                      Our team verifies your teaching credentials and background
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium">Account Activation</h3>
                    <p className="text-sm text-muted-foreground">
                      Once approved, your account will be fully activated
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium">Welcome Email</h3>
                    <p className="text-sm text-muted-foreground">
                      You&apos;ll receive a welcome email with next steps
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-lg bg-muted/50 p-4">
                <p className="text-sm">
                  <span className="font-medium">Need help?</span> Contact our
                  support team at{" "}
                  <a
                    href="mailto:support@teacherportal.com"
                    className="text-primary underline"
                  >
                    support@teacherportal.com
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background/80 py-6 backdrop-blur-sm">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2025 TeacherPortal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
