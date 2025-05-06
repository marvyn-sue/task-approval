import { ICredentials } from "@/types/user";

export async function loginUser(credentials: ICredentials) {
  const res = await fetch(`/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) {
    const errorData = await res.json();

    // Throw a custom error for React Query to catch
    throw new Error(errorData.message || "Failed to create user");
  }

  const data = await res.json();

  return data;
}
