export async function logoutUser() {
  const res = await fetch("/api/logout", {
    method: "POST",
  });

  if (!res.ok) {
    const errorData = await res.json();

    // Throw a custom error for React Query to catch
    throw new Error(errorData.message || "Failed to logout");
  }

  const data = await res.json();

  return data;
}
