"use client";
import axios from "axios";

export interface IssueUpdatePayload {
  fields: {
    summary?: string;
    description?: string;
  };
}

export const updateIssue = async (
  issueKey: string,
  updatePayload: IssueUpdatePayload
) => {
  return await axios.post("api/jira/put-issue", {
    issueKey,
    data: updatePayload,
  });
};
