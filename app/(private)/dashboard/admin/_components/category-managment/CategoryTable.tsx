"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import CategoryDialog from "./CategoryDialog";
import { Category } from "../../_lib/shemaCategorie";

interface CategoryTableProps {
  categories: Category[];
  handleDeleteCategory: (categoryId: string) => void;
  loadData: () => Promise<void>;
}

export default function CategoryTable({
  categories,
  handleDeleteCategory,
  loadData,
}: CategoryTableProps) {
  return (
    <div className="overflow-x-auto w-full">
      <Table className="w-full">
        <TableHeader className="bg-gray-100 dark:bg-gray-600">
          <TableRow>
            <TableHead className="text-center dark:text-white  p-3 min-w-[150px]">
              Name
            </TableHead>
            <TableHead className="text-center dark:text-white  p-3 max-w-[100px]">
              Description
            </TableHead>
            <TableHead className="text-center dark:text-white p-3 min-w-[120px]">
              Courses Count
            </TableHead>
            <TableHead className="text-center dark:text-white p-3 min-w-[180px]">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow
              key={category.id}
              className="border-b hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <TableCell className="text-start p-3">{category.name}</TableCell>
              <TableCell className="text-start p-3">
                {category.description}
              </TableCell>
              <TableCell className="text-center p-3">
                {category.courses_count ? category.courses_count : 0}
              </TableCell>
              <TableCell className="flex justify-center gap-3 p-3">
                <CategoryDialog
                  category={category}
                  refreshCategories={loadData}
                />
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteCategory(String(category.id))}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
