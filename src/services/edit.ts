"use client";
import axios from "axios";

export interface IssueUpdatePayload {
  fields: {
    summary?: string;
    description?: string;
    [key: string]: any;
  };
}

export const updateIssue = async (
  issueKey: string,
  updatePayload: IssueUpdatePayload
) => {
  return await axios.post("api/jira", {
    issueKey,
    data: updatePayload,
  });
};
