"use client";

import Navbar from "@/components/navbar";
import { useUserInfo } from "@/zustand/useUserInfo";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const isLogged = useUserInfo((state) => state.isLogged);
  const hasHydrated = useUserInfo((state) => state.hasHydrated);

  useEffect(() => {
    if (hasHydrated && isLogged === false) {
      router.push("/login");
    }
  }, [hasHydrated, isLogged, router]);

  if (!hasHydrated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
          <span className="visually-hidden"></span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <h1>Home Page</h1>
    </>
  );
}
