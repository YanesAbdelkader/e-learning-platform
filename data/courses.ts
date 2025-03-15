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


