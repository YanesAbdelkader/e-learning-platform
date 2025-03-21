
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getCookie } from "typescript-cookie";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    if (typeof window !== "undefined" && getCookie("token")) {
        redirect("/");
      }
  return (
    <div>
      {children}
    </div>
  );
}
