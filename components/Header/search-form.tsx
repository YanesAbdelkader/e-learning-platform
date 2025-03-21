import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function SearchForm({
  searchQuery,
  setSearchQuery,
  handleSearch,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}) {
  return (
    <form
      onSubmit={handleSearch}
      className="w-full md:pl-10 max-w-sm mr-4"
      role="search"
    >
      <div className="relative">
        <Input
          type="search"
          name="search"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pr-10 rounded-full"
          aria-label="Search courses"
        />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="absolute inset-y-0 right-0 flex items-center pr-3 rounded-e-full"
          aria-label="Submit search"
        >
          <Search className="h-5 w-5 text-gray-400" />
        </Button>
      </div>
    </form>
  );
}
