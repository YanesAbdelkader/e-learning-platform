import Link from "next/link";

export function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="relative text-xl text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white 
         after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] 
         after:bg-indigo-600 dark:after:bg-white after:scale-x-0 after:transition-transform 
         after:duration-300 after:ease-in-out hover:after:scale-x-100"
    >
      {children}
    </Link>
  );
}
