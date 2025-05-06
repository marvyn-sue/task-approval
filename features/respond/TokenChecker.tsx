"use client";
import { getTokenData } from "@/services/apiToken";
import { notFound } from "next/navigation";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import TaskDetails from "@/features/respond/TaskDetails";
import { useRouter } from "next/navigation";
import { IToken } from "@/types/token";

const TokenChecker = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const [data, setData] = useState<IToken | null>(null);

  useEffect(() => {
    const getData = async (token: string) => {
      try {
        const data = await getTokenData(token);
        setData(data);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred"
        );
        setTimeout(() => {
          router.push("/404");
        }, 2000);
      }
    };
    if (token) getData(token);
  }, [token]);

  if (!token) return notFound();

  return <>{data && <TaskDetails taskId={data?.taskId} />}</>;
};

export default TokenChecker;
