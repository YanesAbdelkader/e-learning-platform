import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";


export default function Add() {
  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button>Add New Course</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
          </DialogHeader>
          <form>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input id="title" name="title" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea id="description" name="description" className="col-span-3" />
              </div>
            </div>
            <Button type="submit">Add Course</Button>
          </form>
        </DialogContent>
      </Dialog>
  )
}
