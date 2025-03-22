"use server";

import { fetchIssues } from "../../student/_actions/data";
import { IssuesTable } from "../_components/issues-table";

export default async function IssuesPage() {
  const issues = await fetchIssues();
  return (
    <div className="space-y-6">
      <IssuesTable issues={issues} />
    </div>
  );
}
