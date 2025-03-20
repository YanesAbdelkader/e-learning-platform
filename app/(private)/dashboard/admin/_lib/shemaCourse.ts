export type Course = {
  id: number;
  title: string;
  teacher: string;
  price: number;
  status: "Published" | "Unpublished";
};

export const initialCourses: Course[] = [
  {
    id: 1,
    title: "Introduction to React",
    teacher: "John Doe",
    price: 150,
    status: "Published",
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    teacher: "Jane Smith",
    price: 120,
    status: "Published",
  },
  {
    id: 3,
    title: "Python for Beginners",
    teacher: "Mike Johnson",
    price: 200,
    status: "Unpublished",
  },
];
