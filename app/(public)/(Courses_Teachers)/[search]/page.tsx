import { getCategories } from "../_actions/data";
import { Category } from "../_lib/shema";
import SearchComponent from "./SearchComponent";

export default async function SearchPage() {
  const categories: Category[] = await getCategories();
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <SearchComponent categories={categories} />
      </div>
    </div>
  );
}
