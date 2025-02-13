"use client";

import Navbar from "@/components/navbar";
import { useUserInfo } from "@/zustand/useUserInfo";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const isLogged = useUserInfo((state) => state.isLogged);
  const [loading, setLoading] = useState(true);

  console.log("IsLogged:", isLogged);

  // useEffect(() => {
  //   if (isLogged === false) {
  //     router.push("/login");
  //   } else {
  //     setLoading(false);
  //   }
  // }, [isLogged, router]);

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
  //         <span className="visually-hidden"></span>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      <Navbar />
    </>
  );
}
