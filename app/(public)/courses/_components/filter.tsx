import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Star, Filter, X } from "lucide-react";
import { Category, SearchType } from "../_lib/shema";

export default function FilterC({
    categories,
    searchType,
    setSearchType,
    rating,
    setRating,
    price,
    setPrice,
    isOpen,
    setIsOpen,
  }: {
    categories: Category[];
    searchType: SearchType;
    setSearchType: (value: SearchType) => void;
    rating: number;
    setRating: (value: number) => void;
    price: number;
    setPrice: (value: number) => void;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
  }) {
  return (
    <>
      {/* Toggle Button (For Mobile & Desktop) */}
      <button
        className="flex items-center gap-2 p-2 text-gray-700 bg-gray-200 rounded-md shadow dark:bg-gray-800 dark:text-gray-100"
        onClick={() => setIsOpen(true)}
      >
        <Filter className="w-5 h-5" />
        Filters
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white p-5 z-50 shadow-lg w-3/4 md:w-1/4 transition-transform duration-100 dark:bg-gray-800 dark:border-gray-700 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300"
          onClick={() => setIsOpen(false)}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Filters */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold dark:text-gray-100">Level</h2>
            <Select>
              <SelectTrigger className="w-full dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-500 dark:text-gray-200">
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <h2 className="text-lg font-semibold dark:text-gray-100">
              Category
            </h2>
            <Select>
              <SelectTrigger className="w-full dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-500 dark:text-gray-200">
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <h2 className="text-lg font-semibold dark:text-gray-100">
              Minimum Rating
            </h2>
            <Slider
              min={0}
              max={5}
              step={0.1}
              value={[rating]}
              onValueChange={(value) => setRating(value[0])}
              className="dark:bg-gray-700"
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm dark:text-gray-300">0</span>
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`w-5 h-5 ${
                      index < rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300 dark:text-gray-500"
                    }`}
                  />
                ))}
                <span className="ml-2 dark:text-gray-300">
                  {rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold dark:text-gray-100">
              Price Range
            </h2>
            <Slider
              min={0}
              max={100}
              step={1}
              value={[price]}
              onValueChange={(value) => setPrice(value[0])}
              className="dark:bg-gray-700"
            />
            <div className="flex justify-between mt-2 text-sm dark:text-gray-300">
              <span>${price}</span>
              <span>$100</span>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold dark:text-gray-100">
              Search By
            </h2>
            <RadioGroup
              value={searchType}
              onValueChange={(value) => setSearchType(value as SearchType)}
              className="grid grid-cols-2 gap-3"
            >
              <div
                className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition ${
                  searchType === "Courses"
                    ? "bg-indigo-600 text-white"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              >
                <RadioGroupItem
                  value="Courses"
                  id="courses"
                  className="hidden"
                />
                <Label
                  htmlFor="courses"
                  className="cursor-pointer text-sm font-medium dark:text-gray-100"
                >
                  Courses
                </Label>
              </div>
              <div
                className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition ${
                  searchType === "Teachers"
                    ? "bg-indigo-600 text-white"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              >
                <RadioGroupItem
                  value="Teachers"
                  id="teachers"
                  className="hidden"
                />
                <Label
                  htmlFor="teachers"
                  className="cursor-pointer text-sm font-medium dark:text-gray-100"
                >
                  Teachers
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      {/* Background Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
