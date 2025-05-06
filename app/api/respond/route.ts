import ConnectDB from "@/lib/config/db";
import TaskModel from "@/lib/models/TaskModel";
import TokenModel from "@/lib/models/TokenModel";
import { NextResponse } from "next/server";

const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

export async function POST(req: Request) {
  const { taskId, action } = await req.json();

  const tokenDoc = await TokenModel.findOne({ taskId });
  const task = await TaskModel.findById(taskId);
  task.status = action == "approve" ? "approved" : "rejected";
  tokenDoc.used = true;

  await task.save();
  await tokenDoc.save();

  return NextResponse.json({ message: "Task updated", task });
}
