"use client";

import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { updateCourse } from "../../_actions/CoursesAction";
import { Category, Course } from "../../_lib/schemaCourse";
import { useToast } from "@/hooks/use-toast";
import { Edit } from "lucide-react";

export default function UpdateCourse({
  course,
  categories,
  onCourseUpdated,
}: {
  course: Course;
  categories: Category[];
  onCourseUpdated: (updatedCourse: Course) => void;
}) {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);
  const [open, setOpen] = useState(false); // Keep dialog open until update completes

  const [formValues, setFormValues] = useState({
    id: course.id,
    title: course.title,
    description: course.description,
    price: course.price.toString(),
    category_id: course.category_id.toString(),
    level: course.level,
    imagePreview: course.image ? `/uploads/${course.image}` : null,
    imageFile: null as File | null,
  });

  // Handle input change
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle image selection
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a JPG or PNG image.",
        variant: "destructive",
      });
      return;
    }

    if (formValues.imagePreview) {
      URL.revokeObjectURL(formValues.imagePreview);
    }

    setFormValues((prev) => ({
      ...prev,
      imageFile: file,
      imagePreview: URL.createObjectURL(file),
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData();
    formData.append("id", String(formValues.id));
    formData.append("title", formValues.title);
    formData.append("description", formValues.description);
    formData.append("price", formValues.price);
    formData.append("category_id", formValues.category_id);
    formData.append("level", formValues.level);

    if (formValues.imageFile) {
      formData.append("image", formValues.imageFile);
    }

    const result = await updateCourse(null, formData);
    setIsPending(false);

    if (result?.success) {
      toast({ title: "Course Updated", description: result.message });
      onCourseUpdated({
        ...course,
        ...formValues,
        price: formValues.price,
        category_id: parseInt(formValues.category_id, 10),
        image: formValues.imageFile ? formValues.imageFile.name : course.image,
      });
    } else {
      toast({
        title: "Error",
        description: result?.error,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !isPending && setOpen(val)}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start p-2 h-8 font-normal"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Course</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid gap-4 py-4">
            {/* Title */}
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

            {/* Description */}
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

            {/* Price */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                className="col-span-3"
                value={formValues.price}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Category */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category_id" className="text-right">
                Category
              </Label>
              <Select
                onValueChange={(value) =>
                  setFormValues((prev) => ({ ...prev, category_id: value }))
                }
                value={formValues.category_id}
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

            {/* Image Upload */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                className="col-span-3"
                onChange={handleImageChange}
              />
            </div>

            {/* Image Preview */}
            {formValues.imagePreview && (
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="col-span-4 flex justify-center">
                  <Image
                    src={formValues.imagePreview}
                    alt="Course Image"
                    width={150}
                    height={100}
                    className="rounded-md"
                  />
                </span>
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Update Course"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
