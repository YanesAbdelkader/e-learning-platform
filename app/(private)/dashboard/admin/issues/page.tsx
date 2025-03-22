import { fetchIssues } from "../_actions/IssuesActions";
import IssueManagement from "../_components/issue-management";

export default async function IssuesPage() {
  const issues = await fetchIssues();
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Issue Management</h1>
      <IssueManagement issues={issues}/>
    </div>
  )
}

