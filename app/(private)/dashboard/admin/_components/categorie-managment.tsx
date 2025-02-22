"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { useState } from "react";
import { Category } from "../_lib/shemaCategorie";

export default function CategorieManagment({
  initialCategories,
}: {
  initialCategories: Category[];
}) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.description) {
      setCategories([
        ...categories,
        {
          id: categories.length + 1,
          name: newCategory.name,
          description: newCategory.description,
          coursesCount: 0,
        },
      ]);
      setNewCategory({ name: "", description: "" });
    }
  };

  const handleEditCategory = () => {
    if (editingCategory) {
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id ? editingCategory : cat
        )
      );
      setEditingCategory(null);
    }
  };

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
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New Category</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>
                Enter the details for the new category.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Category Name"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
              />
              <Input
                placeholder="Category Description"
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setNewCategory({ name: "", description: "" })}
              >
                Cancel
              </Button>
              <Button onClick={handleAddCategory}>Add Category</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
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
          {filteredCategories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.description}</TableCell>
              <TableCell>{category.coursesCount}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="default" size="sm">
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Category</DialogTitle>
                      <DialogDescription>
                        Update the details for this category.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <Input
                        placeholder="Category Name"
                        value={editingCategory?.name || category.name}
                        onChange={(e) =>
                          setEditingCategory({
                            ...category,
                            name: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder="Category Description"
                        value={
                          editingCategory?.description || category.description
                        }
                        onChange={(e) =>
                          setEditingCategory({
                            ...category,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setEditingCategory(null)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleEditCategory}>Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
