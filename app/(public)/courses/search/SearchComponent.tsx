"use client";

import { useState } from "react";
import { Category, SearchResult, SearchType } from "../_lib/shema";
import FilterC from "../_components/filter";
import Paginate from "../_components/paginate";

export default function SearchComponent({
  result,
  categories,
}: {
  result: SearchResult;
  categories: Category[];
}) {
  const [searchType, setSearchType] = useState<SearchType>("Courses");
  const [rating, setRating] = useState<number>(0);
  const [price, setPrice] = useState<number>(100);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const totalPages = result.pages;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="space-y-2">
      <FilterC
        categories={categories}
        searchType={searchType}
        setSearchType={setSearchType}
        rating={rating}
        setRating={setRating}
        price={price}
        setPrice={setPrice}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <Paginate
        page={page}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}
