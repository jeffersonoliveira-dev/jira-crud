import { AUTHORIZATION, BASE_URL } from "@/app/common/const";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export interface IssueUpdatePayload {
  fields: {
    summary?: string;
    description?: string;
  };
}

export async function POST(req: NextRequest) {
  const { issueKey, data } = await req.json();
  if (!issueKey || !data) {
    return NextResponse.json({ message: "issueKey and data are required!" });
  }

  try {
    await axios.put(`${BASE_URL}/rest/api/2/issue/${issueKey}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: AUTHORIZATION,
      },
    });

    return NextResponse.json({ message: "issue updated successfully!" });
  } catch (error) {
    console.error("Error fetching Jira issue:", error);
  }
}
