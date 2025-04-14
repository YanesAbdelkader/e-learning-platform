import { handleAPIcall } from "@/functions/custom";


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
      console.log(error);
    }
    if (response) {
      return response.data.transactions;
    }
  } catch (error) {
    console.log(error);
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
      console.log("API Error:", error);
    }

    if (response?.data?.issues) {
      return response.data.issues;
    }
  } catch (error) {
    console.log("Unexpected error in fetchIssues:", error);
  }
}
export async function AddIssues(data: { title: string; content: string }) {
  try {
    const { data: response, error } = await handleAPIcall(
      data,
      null,
      "student/issues/post",
      "POST"
    );

    if (error) {
      console.log("API Error:", error);
      return { success: false, message: "API call failed" };
    }

    if (!response) {
      console.log("Invalid API response:", response);
      return { success: false, message: "Invalid API response" };
    }

    if (response.data) {
      return { success: true };
    }

    return { success: false, message: "No success message in response" };
  } catch (error) {
    console.log("Unexpected Error:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}
