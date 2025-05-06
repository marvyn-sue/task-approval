import { Task } from "@/types/task";

interface RespondTask {
  taskId: string;
  action: "approve" | "decline";
}

export async function respondTask(respond: RespondTask) {
  const res = await fetch(`/api/respond`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(respond),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data: { task: any[] } = await res.json();

  return data;
}
