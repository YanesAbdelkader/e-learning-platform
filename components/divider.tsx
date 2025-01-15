interface DividerProps {
  children: React.ReactNode;
  className?: string;
}

export function Divider({ children, className = "" }: DividerProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="bg-white px-2 text-gray-500 rounded-lg  dark:bg-gray-500 dark:text-white">{children}</span>
      </div>
    </div>
  );
}
