"use client";

import { useEffect, useState } from "react";
import { Category, SearchResult, SearchType } from "../_lib/shema";
import FilterC from "../_components/filter";
import { useParams } from "next/navigation";
import { getSearchResult } from "../_actions/data";
import Loading from "../../loading";
import Courses from "../_components/Courses";
import Teachers from "../_components/Teachers";

export default function SearchComponent({
  categories,
}: {
  categories: Category[];
}) {
  const params = useParams();
  const keyWord = params.search as string;
  const [searchType, setSearchType] = useState<SearchType>("Courses");
  const [result, setResult] = useState<SearchResult>({
    Courses: [],
    Teachers: [],
  });
  const [rating, setRating] = useState<number>(0);
  const [price, setPrice] = useState<number>(10000);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");

  const loadResults = async () => {
    setIsLoading(true);
    try {
      const data = await getSearchResult(keyWord);
      setResult(data || { Courses: [], Teachers: [] });
    } catch (err) {
      console.error("Error fetching search results:", err);
      setResult({ Courses: [], Teachers: [] });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadResults();
  }, [keyWord]);

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
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
      />

      {isLoading ? (
        <Loading />
      ) : searchType === "Courses" ? (
        result?.Courses.length > 0 ? (
            <Courses courses={result?.Courses} />
        ) : (
          <p className="text-center text-gray-500">No courses found.</p>
        )
      ) : searchType === "Teachers" ? (
        result?.Teachers.length > 0 ? (
            <Teachers teachers={result?.Teachers} />
        ) : (
          <p className="text-center justify-center text-gray-500 h-[60vh]">
            No teachers found.
          </p>
        )
      ) : null}
    </div>
  );
}
