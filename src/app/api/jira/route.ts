import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export interface IssueUpdatePayload {
  fields: {
    summary?: string;
    description?: string;
    [key: string]: any;
  };
}

export async function POST(req: NextRequest) {
  const { issueKey, data } = await req.json();
  console.log("issueKey", issueKey);
  if (!issueKey || !data) {
    return NextResponse.json({ message: "issueKey and data are required!" });
  }

  try {
    const base64Encode = (str: string) => {
      return btoa(unescape(encodeURIComponent(str)));
    };
    await axios.put(
      `${process.env.JIRA_DOMAIN}/rest/api/2/issue/${issueKey}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${base64Encode(
            `${process.env.JIRA_EMAIL}:${process.env.JIRA_TOKEN}`
          )}`,
        },
      }
    );

    return NextResponse.json({ message: "issue updated successfully!" });
  } catch (error) {
    console.error("Error fetching Jira issue:", error);
  }
}
