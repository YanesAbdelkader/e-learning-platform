import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png"

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center flex-shrink-0"
      aria-label="Home"
    >
      <Image
        src={logo}
        alt="Logo"
        width={190}
        height={400}
        className="rounded-3xl ring-indigo-500"
        priority
      />
    </Link>
  );
}
