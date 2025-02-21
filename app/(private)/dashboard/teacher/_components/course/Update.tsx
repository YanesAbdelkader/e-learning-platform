"use client";

import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { useState, ChangeEvent } from "react";
import { useActionState } from "react";
import { updateCourse } from "../../_actions/CoursesAction";
import Image from "next/image";
import { Category, Course } from "../../_lib/schemaCourse";

export default function UpdateCourse({
  course,
  categories,
}: {
  course: Course;
  categories: Category[];
}) {
  const [, formAction, isPending] = useActionState(updateCourse, null);
  
  // State to track form values
  const [formValues, setFormValues] = useState({
    id : course.id,
    title: course.title,
    description: course.description,
    price: course.price.toString(),
    category_id: course.category_id.toString(),
    level: course.level,
    imagePreview: course.image ? `/uploads/${course.image}` : null,
    imageFile: null as File | null,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;
  
    // ✅ Validate image type
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      alert("❌ Invalid image format. Please upload a JPG or PNG.");
      return;
    }
  
    // ✅ Release previous object URL to prevent memory leaks
    if (formValues.imagePreview) {
      URL.revokeObjectURL(formValues.imagePreview);
    }
  
    // ✅ Update state
    setFormValues((prev) => ({
      ...prev,
      imageFile: file, // Keep the file for FormData
      imagePreview: URL.createObjectURL(file), // Show preview
    }));
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("id", String(formValues.id));
    formData.append("title", formValues.title);
    formData.append("description", formValues.description);
    formData.append("price", formValues.price);
    formData.append("category_id", formValues.category_id);
    formData.append("level", formValues.level);
  
    // ✅ Ensure the image is appended as a file
    if (formValues.imageFile) {
      formData.append("image", formValues.imageFile);
    }
  
    formAction(formData); // ⬅️ Correctly send data
  };
  
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Course</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                className="col-span-3"
                value={formValues.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                className="col-span-3"
                value={formValues.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                className="col-span-3"
                value={formValues.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select
                name="category_id"
                onValueChange={(value) => setFormValues({ ...formValues, category_id: value })}
                defaultValue={formValues.category_id}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="level" className="text-right">
                Level
              </Label>
              <Select
                name="level"
                onValueChange={(value) => setFormValues({ ...formValues, level: value })}
                defaultValue={formValues.level}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="col-span-3"
              />
            </div>
            {formValues.imagePreview && (
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="col-start-2 col-span-3">
                  <Image
                    src={formValues.imagePreview}
                    alt="Preview"
                    className="max-w-full h-auto"
                    width={200}
                    height={200}
                  />
                </div>
              </div>
            )}
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Updating..." : "Update Course"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
