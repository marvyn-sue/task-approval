import { IToken } from "@/types/token";

export async function getTokenData(token: string): Promise<IToken> {
  const res = await fetch(`http://localhost:3000/api/verify?token=${token}`);

  if (!res.ok) {
    const errorData = await res.json();

    // Throw a custom error for React Query to catch
    throw new Error(errorData.message || "Failed to create user");
  }

  const data = await res.json();

  return data;
}
