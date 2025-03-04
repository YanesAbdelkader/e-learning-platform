"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Category } from "../../_lib/shemaCategorie";
import { addCategory, updateCategory } from "../../_actions/categoryActions";

interface CategoryDialogProps {
  category?: Category | null;
  refreshCategories: () => Promise<void>;
}

export default function CategoryDialog({
  category,
  refreshCategories,
}: CategoryDialogProps) {
  const [name, setName] = useState(category?.name || "");
  const [description, setDescription] = useState(category?.description || "");
  const [loading, setLoading] = useState(false);

  // Update state when category changes
  useEffect(() => {
    setName(category?.name || "");
    setDescription(category?.description || "");
  }, [category]);

  const handleSave = async () => {
    if (!name.trim() || !description.trim()) {
      toast({
        title: "Error",
        description: "Fields cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    if (category) {
      formData.append("id", String(category.id));
    }

    const result = category
      ? await updateCategory(null, formData)
      : await addCategory(null, formData);

    if (result?.success) {
      toast({ title: "Success", description: result.message });
      await refreshCategories();
    } else {
      toast({
        title: "Error",
        description: result?.error,
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <Dialog key={category?.id || "new"}>
      <DialogTrigger asChild>
        <Button>{category ? "Edit Category" : "Add New Category"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {category ? "Edit Category" : "Add New Category"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Category Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading || !name || !description}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
