import ConnectDB from "@/lib/config/db";
import TaskModel from "@/lib/models/TaskModel";
import { NextResponse } from "next/server";

const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const task = await TaskModel.findById(id).lean();
  return NextResponse.json({ task }, { status: 200 });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const task = await TaskModel.findByIdAndUpdate(id, body, {
    new: true,
  });
  return NextResponse.json({ task }, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const deletedTask = await TaskModel.findByIdAndDelete(id);
  return NextResponse.json({ deletedTask }, { status: 200 });
}
