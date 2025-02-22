import type React from "react";
import Sidebar from "./_components/sidebar";
import Header from "./_components/header";

export const metadata = {
  title: "Minimalist Admin Dashboard",
  description: "A modern and minimalist admin dashboard",
  generator: "v0.dev",
};

export default function DashbordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
