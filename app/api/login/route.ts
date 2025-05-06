import ConnectDB from "@/lib/config/db";
import UserModel from "@/lib/models/UserModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { generateToken } from "@/lib/generateToken";
import { cookies } from "next/headers";

const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = generateToken(user._id.toString());

    const res = NextResponse.json({ user, token }, { status: 200 });

    res.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60, // 1 hour
    });
    return res;
  } catch (error) {}

  return NextResponse.json(
    { message: "Internal server error" },
    { status: 500 }
  );
}
