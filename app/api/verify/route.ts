import ConnectDB from "@/lib/config/db";
import { verifyToken } from "@/lib/generateToken";
import TokenModel from "@/lib/models/TokenModel";
import { NextRequest, NextResponse } from "next/server";
import { log } from "node:console";

const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ message: "No token provided" }, { status: 400 });
  }

  try {
    const isTokenValid = verifyToken(token);
    if (!isTokenValid) {
      return NextResponse.json({ message: "Token expired" }, { status: 403 });
    }
    const tokenData = await TokenModel.findOne({ token });

    if (tokenData.used) {
      return NextResponse.json(
        { message: "Token already used" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { ...tokenData, taskId: tokenData.taskId.toString() },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
