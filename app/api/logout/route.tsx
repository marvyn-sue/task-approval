import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST() {
  // Create a response
  const response = NextResponse.json({ message: "Logged out successfully" });

  // Clear the token cookie (set maxAge to -1)
  response.headers.set(
    "Set-Cookie",
    serialize("token", "", {
      path: "/", // Path for which the cookie is valid
      httpOnly: true, // Cookie cannot be accessed by JavaScript (security)
      maxAge: -1, // Expire the cookie immediately
    })
  );

  // Optionally, you can also redirect the user after logging out
  // response.redirect('/login'); // Uncomment this line to redirect to login

  return response;
}
