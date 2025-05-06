import { Task, TaskForm } from "@/types/task";

export async function getTaskById(id: string): Promise<Task> {
  const res = await fetch(`/api/task/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data: { task: Task } = await res.json();

  return data.task;
}

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(`/api/task`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data: { task: Task[] } = await res.json();

  return data.task.reverse();
}

export async function createTask(task: TaskForm) {
  const res = await fetch(`/api/task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data: { task: Task[] } = await res.json();

  return data.task;
}

export async function patchTask({
  task,
  taskId,
}: {
  task: TaskForm;
  taskId: string;
}) {
  const res = await fetch(`/api/task/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data: { task: Task } = await res.json();

  return data.task;
}

export async function deleteTask(taskId: string) {
  const res = await fetch(`/api/task/${taskId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data: { task: Task } = await res.json();

  return data.task;
}
