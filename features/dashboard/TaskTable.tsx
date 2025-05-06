"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { getTasks } from "@/services/apiTask";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import RowAction from "./RowAction";

const TaskTable = () => {
  const { isLoading, data: task } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  return (
    <Table>
      <TableHeader className=" bg-muted">
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Assignee</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {!isLoading &&
          task?.map((task) => (
            <TableRow key={task._id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.email}</TableCell>
              <TableCell>
                <Badge
                  variant="default"
                  className={cn({
                    "bg-blue-600": task?.status === "pending",
                    "bg-green-600": task?.status === "approved",
                    "bg-destructive": task?.status === "rejected",
                  })}
                >
                  {task.status}
                </Badge>
              </TableCell>
              <TableCell>
                <RowAction taskId={task._id.toString()} />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default TaskTable;
