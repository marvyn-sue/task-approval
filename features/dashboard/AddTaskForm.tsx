"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createTask, getTaskById, patchTask } from "@/services/apiTask";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useContextTaskForm } from "./ContextTaskForm";
import { toast } from "react-toastify";
import { log } from "node:console";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Required",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  description: z.string(),
});

const AddTaskForm = () => {
  const { formData, resetState } = useContextTaskForm();
  const queryClient = useQueryClient();

  const { mutate: saveTask, isPending } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      resetState();
      toast.success("Added New Task");
    },
  });

  const { mutate: updateTask } = useMutation({
    mutationFn: patchTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      resetState();
      toast.success("Task Updated");
    },
  });

  const { data, isSuccess } = useQuery({
    queryKey: ["task", formData?.taskId],
    queryFn: () => getTaskById(formData?.taskId!),

    enabled: !!formData?.taskId,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title ?? "",
      email: data?.email ?? "",
      description: data?.description ?? "",
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      form.reset(data);
    }
  }, [isSuccess, data]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    formData?.action == "add"
      ? saveTask(data)
      : updateTask({ task: data, taskId: formData?.taskId! });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Task Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assign To</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Task Details" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>{isPending ? "Saving..." : "Save"}</Button>
      </form>
    </Form>
  );
};

export default AddTaskForm;
