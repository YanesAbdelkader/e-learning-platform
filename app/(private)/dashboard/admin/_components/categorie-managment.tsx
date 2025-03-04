"use client";

import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Category } from "../_lib/shemaCategorie";
import { deleteCategory, fetchCategory } from "../_actions/categoryActions";
import { useEffect, useState } from "react";
import CategoryDialog from "./category-managment/CategoryDialog";
import CategoryTable from "./category-managment/CategoryTable";
import { toast } from "@/hooks/use-toast";

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchCategory();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading data:", error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (courseId: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (!isConfirmed) return;

    const result = await deleteCategory(courseId);
    if (result?.success) {
      toast({
        title: "Course Deleted",
        description: result.message,
      });

      await loadData();
    } else {
      toast({
        title: "Error",
        description: result?.error,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredCategories = categories.filter(
    ({ name, description }) =>
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Category Management</h1>
      <div className="flex justify-between items-center mb-4">
        <Input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <CategoryDialog category={null} refreshCategories={loadData} />
      </div>
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="animate-spin h-10 w-10 text-gray-500" />
        </div>
      ) : (
        <CategoryTable
          categories={filteredCategories}
          handleDeleteCategory={handleDeleteCategory}
          loadData={loadData}
        />
      )}
    </div>
  );
}
