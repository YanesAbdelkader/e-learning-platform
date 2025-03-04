// This file simulates data fetching that would connect to your Laravel API

export async function getCourseDetails(id: string) {
  // In a real app, you would fetch this from your Laravel API
  // Example: const response = await fetch(`https://your-laravel-api.com/api/courses/${id}`)

  // Simulated data
  return {
    id,
    title: "Complete Web Development Bootcamp",
    description:
      "Master web development with this comprehensive bootcamp. Learn HTML, CSS, JavaScript, React, Node.js, and more!",
    rating: 4.8,
    students: 12543,
    isBestseller: true,
    duration: "48 hours",
    level: "Beginner to Advanced",
    hasCertificate: true,
    lastUpdated: "June 2023",
    price: 89.99,
    thumbnail: "/placeholder.svg?height=200&width=400",
    curriculum: [
      "Introduction to Web Development",
      "HTML5 and CSS3 Fundamentals",
      "JavaScript Essentials",
      "Responsive Web Design",
      "Introduction to React",
      "Backend Development with Node.js",
      "Database Integration with MongoDB",
      "Deployment and DevOps Basics",
    ],
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"],
    instructor: {
      name: "John Doe",
      role: "Senior Web Developer & Instructor",
      avatar: "/placeholder.svg?height=64&width=64",
      bio: "John has over 10 years of experience in web development and has taught more than 500,000 students worldwide. He specializes in modern JavaScript frameworks and full-stack development.",
    },
  }
}

export async function getRelatedCourses(courseId: string) {
  // In a real app, you would fetch this from your Laravel API
  // Example: const response = await fetch(`https://your-laravel-api.com/api/courses/${courseId}/related`)

  // Simulated data
  return [
    {
      id: 1,
      title: "Advanced React Patterns",
      rating: 4.7,
      students: 8432,
      price: 79.99,
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: 2,
      title: "Full-Stack JavaScript Masterclass",
      rating: 4.9,
      students: 15621,
      price: 94.99,
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: 3,
      title: "Modern CSS and SASS",
      rating: 4.6,
      students: 7845,
      price: 69.99,
      image: "/placeholder.svg?height=120&width=200",
    },
  ]
}

export async function getReviews(courseId: string) {
  // In a real app, you would fetch this from your Laravel API
  // Example: const response = await fetch(`${process.env.API_URL}/courses/${courseId}/reviews`)

  // Simulated data
  return [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      comment:
        "This course completely changed my career path. The instructor explains complex concepts in a way that's easy to understand.",
      date: "2 weeks ago",
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      comment: "Great content and structure. I would have liked more exercises, but overall it's excellent.",
      date: "1 month ago",
    },
  ]
}

