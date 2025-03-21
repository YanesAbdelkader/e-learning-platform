import { Button } from "@/components/ui/button";
import { BookX, RefreshCw } from "lucide-react";

type EmptyStateProps = {
  title: string;
  description: string;
  category?: string;
  onRefresh?: () => void;
};

export function EmptyState({
  title,
  description,
  category,
  onRefresh,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-muted/30 p-6 rounded-full mb-4">
        <BookX className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-md mb-4">
        {description}
        {category && category !== "All Categories" && (
          <span className="font-medium">
            {" "}
            Try selecting a different category or check back later.
          </span>
        )}
      </p>
      {onRefresh && (
        <Button
          onClick={onRefresh}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      )}
    </div>
  );
}
