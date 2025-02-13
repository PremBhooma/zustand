import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useUserStore } from "@/zustand/useUserStore";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect } from "react";
import { Trash2 } from "lucide-react";

const AllUsers = () => {
  const { users, loading, error, getAllUsers, deleteUser } = useUserStore();

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
      getAllUsers();
    }
  };

  return (
    <>
      <div className="text-center mt-5">
        <h1>All User</h1>
      </div>
      <div className="w-[70%] mx-auto overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-48" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-5" />
                    </TableCell>
                  </TableRow>
                ))
              : users?.data?.map((user) => (
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
