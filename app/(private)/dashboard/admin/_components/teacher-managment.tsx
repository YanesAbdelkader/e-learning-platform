"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Teacher } from "../_lib/shemaTecher";
export default function TeacherManagment({
  initialUsers,
}: {
  initialUsers: Teacher[];
}) {
  const [users, setUsers] = useState<Teacher[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleUserStatus = (userId: number) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === "Active" ? "Blocked" : "Active" }
          : user
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Teacher Management</h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge
                  variant={user.status === "Active" ? "default" : "destructive"}
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell className="flex justify-evenly">
                <Button variant="secondary" size="sm">
                  Verify
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => toggleUserStatus(user.id)}
                >
                  {user.status === "Active" ? "Block" : "Unblock"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
