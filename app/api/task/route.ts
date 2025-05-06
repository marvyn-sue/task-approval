import ConnectDB from "@/lib/config/db";
import { generateToken } from "@/lib/generateToken";
import TaskModel from "@/lib/models/TaskModel";
import TokenModel from "@/lib/models/TokenModel";
import { sendApprovalEmail } from "@/lib/sendApprovalEmail";
import { NextResponse } from "next/server";

const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

export async function GET() {
  const task = await TaskModel.find({});
  return NextResponse.json({ task });
}

export async function POST(request: Request) {
  const body = await request.json();

  const task = await TaskModel.create(body);

  const token = generateToken(task._id.toString());
  await TokenModel.create({ token, taskId: task._id });

  await sendApprovalEmail(task.email, task.title, token);

  return NextResponse.json(
    { msg: "Task created successfully", task },
    { status: 200 }
  );
}
