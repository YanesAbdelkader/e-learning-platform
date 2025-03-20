"use server";

import { handleAPIcall } from "@/functions/custom";

// Simulated course data
// const courses = [
//   {
//     id: "1",
//     title: "Complete Web Development Bootcamp",
//     description:
//       "Master web development with this comprehensive bootcamp. Learn HTML, CSS, JavaScript, React, Node.js, and more!",
//     rating: 4.8,
//     students: 12543,
//     isBestseller: true,
//     duration: "48 hours",
//     level: "Beginner to Advanced",
//     hasCertificate: true,
//     lastUpdated: "June 2023",
//     price: 89.99,
//     thumbnail: "/placeholder.svg?height=200&width=400",
//     curriculum: [
//       "Introduction to Web Development",
//       "HTML5 and CSS3 Fundamentals",
//       "JavaScript Essentials",
//       "Responsive Web Design",
//       "Introduction to React",
//       "Backend Development with Node.js",
//       "Database Integration with MongoDB",
//       "Deployment and DevOps Basics",
//     ],
//     skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"],
//     instructor: {
//       name: "John Doe",
//       role: "Senior Web Developer & Instructor",
//       avatar: "/placeholder.svg?height=64&width=64",
//       bio: "John has over 10 years of experience in web development and has taught more than 500,000 students worldwide. He specializes in modern JavaScript frameworks and full-stack development.",
//     },
//     reviews: [
//       {
//         id: 1,
//         name: "Sarah Johnson",
//         avatar: "/placeholder.svg?height=40&width=40",
//         rating: 5,
//         comment:
//           "This course completely changed my career path. The instructor explains complex concepts in a way that's easy to understand.",
//         date: "2 weeks ago",
//       },
//       {
//         id: 2,
//         name: "Michael Chen",
//         avatar: "/placeholder.svg?height=40&width=40",
//         rating: 4,
//         comment: "Great content and structure. I would have liked more exercises, but overall it's excellent.",
//         date: "1 month ago",
//       },
//     ],
//   },
//   // Add more courses here if needed
// ]

export async function getCourseDetails(courseId: string) {
  try {
    const { data: response, error } = await handleAPIcall(
      null,
      courseId,
      "courses",
      "GET"
    );
    if (error) {
      console.error(error);
    }
    if (response) {
      return response.data.course;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getRelatedCourses(courseId: string) {
  try {
    const { data: response, error } = await handleAPIcall(
      null,
      `${courseId}/related`,
      "courses",
      "GET"
    );
    if (error) {
      console.error(error);
      return [];
    }
    if (response) {
      return response.data.related;
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getReviews(courseId: string) {
  try {
    const { data: response, error } = await handleAPIcall(
      null,
      `${courseId}/reviews`,
      "courses",
      "GET"
    );
    if (error) {
      console.error(error);
    }
    if (response) {
      return response.data.reviews;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function toggleWishlist(courseId: string, isWishlisted: boolean) {
  console.log(
    `${isWishlisted ? "Removed from" : "Added to"} wishlist: ${courseId}`
  );
  return !isWishlisted;
}

export async function submitReview(
  courseId: string,
  reviewData: { rating: number; comment: string }
) {
  const newReview = {
    id: Date.now(),
    name: "You",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: reviewData.rating,
    comment: reviewData.comment,
    date: "Just now",
  };

  console.log(`Review submitted for course ${courseId}:`, newReview);
  return newReview;
}

export async function addToCart(courseId: string) {
  console.log(`Added to cart: ${courseId}`);
  return true;
}

export async function buyNow(courseId: string) {
  const Id = { courseId: courseId };
  try {
    const { data: response, error } = await handleAPIcall(
      Id,
      ``,
      "chargilypay/redirect",
      "POST"
    );
    if (error) {
      console.error(error);
    }
    if (response) {
      return response.data.url;
    }
  } catch (error) {
    console.error(error);
  }
}
