"use client";
import { useState, ChangeEvent } from "react";
import { useActionState } from "react";
import Image from "next/image";
import { addCourse } from "../../_actions/CoursesAction";
import { Category } from "../../_lib/schemaCourse";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AddCourse({ categories }: { categories: Category[] }) {
  const [, formAction, isPending] = useActionState(addCourse, null);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category_id: "",
    level: "",
    imageFile: null as File | null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (key: "category_id" | "level") => (value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, imageFile: file }));
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("description", formData.description);
    submitData.append("price", formData.price);
    submitData.append("category_id", formData.category_id);
    submitData.append("level", formData.level);
    
    if (formData.imageFile) {
      submitData.append("image", formData.imageFile);
    }

    formAction(submitData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add New Course</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Course</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input id="title" name="title" className="col-span-3" required value={formData.title} onChange={handleInputChange} />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Textarea id="description" name="description" className="col-span-3" required value={formData.description} onChange={handleInputChange} />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">Price</Label>
              <Input id="price" name="price" type="number" step="0.01" className="col-span-3" required value={formData.price} onChange={handleInputChange} />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Category</Label>
              <Select onValueChange={handleSelectChange("category_id")}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Level</Label>
              <Select onValueChange={handleSelectChange("level")}>
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
              <Label htmlFor="image" className="text-right">Image</Label>
              <Input id="image" name="image" type="file" accept="image/*" onChange={handleImageChange} className="col-span-3" required />
            </div>

            {imagePreview && (
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="col-start-2 col-span-3">
                  <Image src={imagePreview} alt="Preview" className="max-w-full h-auto" width={200} height={200} />
                </div>
              </div>
            )}
          </div>

          <Button type="submit" disabled={isPending}>{isPending ? "Adding..." : "Add Course"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
