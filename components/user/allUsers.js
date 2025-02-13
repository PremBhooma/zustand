import { useUserStore } from "@/zustand/useUserStore";
import React, { useEffect } from "react";

const AllUsers = () => {
  const { users, loading, error, getAllUsers } = useUserStore();

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  console.log("Users:", users);

  return <div>AllUsers</div>;
};

export default AllUsers;
