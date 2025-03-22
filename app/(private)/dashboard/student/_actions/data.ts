import { handleAPIcall } from "@/functions/custom";

export async function fetchLearningActivity() {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock data that would come from Laravel API
  return [
    { name: "Mon", hours: 2.5 },
    { name: "Tue", hours: 3.2 },
    { name: "Wed", hours: 1.8 },
    { name: "Thu", hours: 4.0 },
    { name: "Fri", hours: 2.0 },
    { name: "Sat", hours: 5.5 },
    { name: "Sun", hours: 3.7 },
  ];
}

// Recent activity data
export async function fetchRecentActivity() {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Mock data that would come from Laravel API
  return [
    {
      id: "1",
      type: "video",
      title: "Watched 'Introduction to React Hooks'",
      course: "Advanced React Patterns",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      type: "quiz",
      title: "Completed 'JavaScript Fundamentals Quiz'",
      course: "JavaScript Mastery",
      timestamp: "Yesterday",
    },
    {
      id: "3",
      type: "reading",
      title: "Read 'Understanding CSS Grid'",
      course: "Modern CSS Techniques",
      timestamp: "2 days ago",
    },
    {
      id: "4",
      type: "certificate",
      title: "Earned 'Python Basics' Certificate",
      course: "Python Programming",
      timestamp: "1 week ago",
    },
    {
      id: "5",
      type: "video",
      title: "Watched 'Database Design Principles'",
      course: "SQL Fundamentals",
      timestamp: "1 week ago",
    },
  ];
}

// Course progress data
export async function fetchCourseProgress() {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1200));

  // Mock data that would come from Laravel API
  return [
    {
      id: "1",
      title: "Advanced React Patterns",
      instructor: "Jane Smith",
      progress: 65,
      lastAccessed: "Today",
    },
    {
      id: "2",
      title: "JavaScript Mastery",
      instructor: "John Doe",
      progress: 42,
      lastAccessed: "Yesterday",
    },
    {
      id: "3",
      title: "Python Programming",
      instructor: "Alex Johnson",
      progress: 89,
      lastAccessed: "3 days ago",
    },
  ];
}

// Transactions data
export async function fetchTransactions() {
  try {
    const { data: response, error } = await handleAPIcall(
      null,
      null,
      "student/transactions",
      "GET"
    );
    if (error) {
      console.error(error);
    }
    if (response) {
      return response.data.transactions;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function fetchIssues() {
  try {
    const { data: response, error } = await handleAPIcall(
      null,
      null,
      "student/issues",
      "GET"
    );

    if (error) {
      console.error("API Error:", error);
    }

    if (response?.data?.issues) {
      return response.data.issues;
    }
  } catch (error) {
    console.error("Unexpected error in fetchIssues:", error);
  }
}
export async function AddIssues(data: { title: string; content: string }) {
  try {
    // Call the API
    const { data: response, error } = await handleAPIcall(
      data,
      null,
      "student/issues/post",
      "POST"
    );

    if (error) {
      console.error("API Error:", error);
      return { success: false, message: "API call failed" };
    }

    if (!response) {
      console.error("Invalid API response:", response);
      return { success: false, message: "Invalid API response" };
    }

    if (response.data) {
      return { success: true };
    }

    return { success: false, message: "No success message in response" };
  } catch (error) {
    console.error("Unexpected Error:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}
