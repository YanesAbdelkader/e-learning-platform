export type Teacher = {
  id: number;
  name: string;
  email: string;
  status: "Active" | "Blocked";
};

export const initialUsers: Teacher[] = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "Blocked" },
];
