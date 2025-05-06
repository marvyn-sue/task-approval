"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { respondTask } from "@/services/apiRespond";
import { getTaskById } from "@/services/apiTask";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BookText, CircleDot, LayoutList, User } from "lucide-react";

interface TaskDetailsProps {
  taskId: string;
}

const TaskDetails = ({ taskId }: TaskDetailsProps) => {
  const queryClient = useQueryClient();

  const { data: task, error } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById(taskId),
    enabled: !!taskId, // only runs if id is truthy
  });

  const { mutate } = useMutation({
    mutationFn: respondTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    },
  });

  return (
    <Dialog open={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Accept Task?</DialogTitle>
          <div className="text-muted-foreground text-sm">
            <div className="grid grid-cols-[100px_1fr] gap-2 pt-2">
              <div className="flex items-center gap-2">
                <LayoutList size={16} />
                Title
              </div>
              <div className="text-black font-semibold">{task?.title}</div>
              <div className="flex items-center gap-2">
                <User size={16} />
                Assignee
              </div>
              <div>
                <Badge variant="outline">{task?.email}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <CircleDot size={16} />
                Status
              </div>
              <div>
                <Badge
                  variant={
                    task?.status === "rejected" ? "destructive" : "default"
                  }
                  className={cn({
                    "bg-blue-600": task?.status === "pending",
                    "bg-green-600": task?.status === "approved",
                    "bg-destructive": task?.status === "rejected",
                  })}
                >
                  {task?.status}
                </Badge>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 pt-2 pb-2">
                <BookText size={16} />
                Description
              </div>
              <Textarea value={task?.description} />
            </div>
          </div>
        </DialogHeader>
        {task?.status === "pending" && (
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() => mutate({ taskId, action: "decline" })}
            >
              Decline
            </Button>
            <Button
              variant="success"
              onClick={() => mutate({ taskId, action: "approve" })}
            >
              Approve
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetails;
