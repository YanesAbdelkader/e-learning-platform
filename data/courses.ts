export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  image: string;
}

export const courses: Course[] = [
  {
    id: '1',
    title: 'Introduction to React',
    description: 'Learn the basics of React and build your first app',
    price: 49.99,
    category: 'Web Development',
    level: 'Beginner',
    rating: 4.5,
    image: '/placeholder.svg?height=200&width=300',
  },
  {
    id: '2',
    title: 'Advanced JavaScript Concepts',
    description: 'Deep dive into advanced JavaScript topics',
    price: 79.99,
    category: 'Programming',
    level: 'Advanced',
    rating: 4.8,
    image: '/placeholder.svg?height=200&width=300',
  },
  {
    id: '3',
    title: 'Data Science Fundamentals',
    description: 'Get started with data science and machine learning',
    price: 59.99,
    category: 'Data Science',
    level: 'Intermediate',
    rating: 4.2,
    image: '/placeholder.svg?height=200&width=300',
  },
  {
    id: '4',
    title: 'UX/UI Design Principles',
    description: 'Learn the fundamentals of user experience and interface design',
    price: 69.99,
    category: 'Design',
    level: 'Beginner',
    rating: 4.6,
    image: '/placeholder.svg?height=200&width=300',
  },
  {
    id: '5',
    title: 'Mobile App Development with Flutter',
    description: 'Build cross-platform mobile apps with Flutter',
    price: 89.99,
    category: 'Mobile Development',
    level: 'Intermediate',
    rating: 4.7,
    image: '/placeholder.svg?height=200&width=300',
  },
];

