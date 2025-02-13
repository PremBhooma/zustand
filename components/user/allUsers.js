import { useUserStore } from "@/zustand/useUserStore";
import React, { useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Trash2 } from "lucide-react";

const AllUsers = () => {
  const { users, loading, error, getAllUsers } = useUserStore();

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  console.log("Users:", users);

  const handleDelete = (id) => {
    console.log("Deleting user with id:", id);
  };

  return (
    <>
      <div className="p-5 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.data?.map((user) => (
              <TableRow key={user?.id}>
                <TableCell>{user?.name}</TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell>
                  <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default AllUsers;
