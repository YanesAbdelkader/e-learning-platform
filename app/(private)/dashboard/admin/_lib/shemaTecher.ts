export type Teacher = {
  id: number;
  name: string;
  lastname: string;
  email: string;
  picture: string;
  role: "teacher";
  status: "Active" | "Blocked";
  course_count: number;
  teacher_info: {
    id: number;
    user_id: number;
    subjects: string[];
    rating: number | null;
    contactinfo: string;
    certifications: string[];
    education: string;
    links: string[];
    bio: string;
    verified: boolean;
  };
};
