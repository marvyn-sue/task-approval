"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddTaskForm from "./AddTaskForm";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useContextTaskForm } from "./ContextTaskForm";

const AddTaskModal = () => {
  const { formData, setFormData, resetState } = useContextTaskForm();

  return (
    <Dialog
      open={formData?.open}
      onOpenChange={(open) => !open && resetState()}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          type="button"
          onClick={() =>
            setFormData({ ...formData, open: true, action: "add" })
          }
        >
          <PlusIcon />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby="add task">
        <DialogHeader>
          <DialogTitle>
            {formData?.action === "add" ? "Add Task" : "Edit Task"}
          </DialogTitle>
        </DialogHeader>
        <div>
          <AddTaskForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskModal;
