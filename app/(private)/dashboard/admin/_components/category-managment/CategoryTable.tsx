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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Courses Count</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell>{category.name}</TableCell>
            <TableCell>{category.description}</TableCell>
            <TableCell>{category.coursesCount}</TableCell>
            <TableCell className="flex gap-2">
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
  );
}
