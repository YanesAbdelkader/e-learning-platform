
import { Category, SearchResult } from "../../_lib/shema";
import SearchComponent from "./SearchComponent"

export default function SearchPage() {
  const categories:Category[] = [];
  const data:SearchResult={
    Courses: [],
    Teachers: [],
    pages: 0
  }
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <SearchComponent result={data} categories={categories} />
      </div>
    </div>
  )
}

