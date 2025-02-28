"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Category } from "../../_lib/schemaCourse";
import { addCourse } from "../../_actions/CoursesAction";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AddCourse({
  categories,
  onCourseAdded,
}: {
  categories: Category[];
  onCourseAdded: () => void;
}) {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !description || !level || !categoryId || !price || !image) {
      toast({ title: "Error", description: "All fields are required", variant: "destructive" });
      return;
    }

    setIsPending(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("level", level);
    formData.append("category_id", categoryId);
    formData.append("price", price);
    formData.append("image", image);

    const result = await addCourse(null,formData);

    setIsPending(false);
    if (result?.success) {
      toast({ title: "Course Created", description: result.message });
      onCourseAdded(); // Refresh courses
    } else {
      toast({ title: "Error", description: result?.error, variant: "destructive" });
    }
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Course Title" />
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
          
          {/* Select Level */}
          <Select onValueChange={(val) => setLevel(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>

          {/* Select Category */}
          <Select onValueChange={(val) => setCategoryId(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={String(category.id)}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
          <Input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />

          <Button type="submit" disabled={isPending}>{isPending ? "Adding..." : "Add Course"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
