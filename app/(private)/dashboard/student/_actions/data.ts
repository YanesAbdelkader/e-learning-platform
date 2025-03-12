// This file simulates API calls to a Laravel backend

// Learning activity data for the chart
export async function fetchLearningActivity() {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock data that would come from Laravel API
  return [
    { name: "Mon", hours: 2.5 },
    { name: "Tue", hours: 3.2 },
    { name: "Wed", hours: 1.8 },
    { name: "Thu", hours: 4.0 },
    { name: "Fri", hours: 2.0 },
    { name: "Sat", hours: 5.5 },
    { name: "Sun", hours: 3.7 },
  ]
}

// Recent activity data
export async function fetchRecentActivity() {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800))

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
  ]
}

// Course progress data
export async function fetchCourseProgress() {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1200))

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
  ]
}

// Transactions data
export async function fetchTransactions() {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Mock data that would come from Laravel API
  return [
    {
      id: "1",
      date: "2023-03-15",
      description: "Advanced React Patterns Course",
      amount: 49.99,
      status: "completed",
      type: "course",
    },
    {
      id: "2",
      date: "2023-03-01",
      description: "Monthly Subscription",
      amount: 19.99,
      status: "completed",
      type: "subscription",
    },
    {
      id: "3",
      date: "2023-02-22",
      description: "JavaScript Mastery Course",
      amount: 59.99,
      status: "completed",
      type: "course",
    },
    {
      id: "4",
      date: "2023-02-15",
      description: "Python Programming Bundle",
      amount: 89.99,
      status: "refunded",
      type: "course",
    },
    {
      id: "5",
      date: "2023-02-01",
      description: "Monthly Subscription",
      amount: 19.99,
      status: "completed",
      type: "subscription",
    },
    {
      id: "6",
      date: "2023-01-28",
      description: "SQL Fundamentals Course",
      amount: 39.99,
      status: "pending",
      type: "course",
    },
  ] as const
}

// Issues data
export async function fetchIssues() {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1300))

  // Mock data that would come from Laravel API
  return [
    {
      id: "1",
      title: "Video not playing in Module 3",
      course: "Advanced React Patterns",
      date: "2023-03-14",
      status: "open",
      priority: "high",
    },
    {
      id: "2",
      title: "Quiz answers marked incorrectly",
      course: "JavaScript Mastery",
      date: "2023-03-10",
      status: "in-progress",
      priority: "medium",
    },
    {
      id: "3",
      title: "Certificate not generating after completion",
      course: "Python Programming",
      date: "2023-03-05",
      status: "resolved",
      priority: "high",
    },
    {
      id: "4",
      title: "Course content missing in Module 5",
      course: "SQL Fundamentals",
      date: "2023-02-28",
      status: "closed",
      priority: "low",
    },
    {
      id: "5",
      title: "Billing issue with subscription",
      course: "N/A",
      date: "2023-02-20",
      status: "resolved",
      priority: "medium",
    },
  ] as const
}

