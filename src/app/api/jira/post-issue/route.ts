import { NextRequest, NextResponse } from "next/server";
import { AUTHORIZATION, BASE_URL } from "@/app/common/const";
import axios from "axios";

export interface IssueCreatePayload {
  fields: {
    project: {
      id: string;
    };
    summary: string;
    description: string;
    issuetype: {
      id: string;
    };
  };
}

export interface IssueTypesDTO {
  self: string;
  id: string;
  description: string;
  iconUrl: string;
  name: string;
  untranslatedName: string;
  subtask: false;
  hierarchyLevel: 0;
}

export async function POST(req: NextRequest) {
  const { fields }: IssueCreatePayload = await req.json();

  if (
    !fields ||
    !fields?.project?.id ||
    !fields?.summary ||
    !fields?.description
  ) {
    return NextResponse.json({ message: "All fields are required!" });
  }

  try {
    const createStoryPayload = {
      fields: {
        ...fields,
        issuetype: {
          id: await getStoryId(fields.project.id),
        },
      },
    };

    const response = await axios.post(
      `${BASE_URL}/rest/api/2/issue`,
      createStoryPayload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: AUTHORIZATION,
        },
      }
    );

    return NextResponse.json({
      message: "Issue created successfully!",
      issue: response.data,
    });
  } catch (error: any) {
    console.error("Error creating Jira issue:", error);
    return NextResponse.json({
      message: "Error creating issue",
      error: error.message,
    });
  }
}

async function getStoryId(projectId: string) {
  try {
    const response = await axios.get(
      `${BASE_URL}/rest/api/2/issue/createmeta/${projectId}/issuetypes`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: AUTHORIZATION,
        },
      }
    );
    if (response?.data) {
      const getStoryType = response?.data?.issueTypes?.find(
        (issueType: IssueTypesDTO) => issueType.name === "Story"
      );
      if (getStoryType) {
        return getStoryType.id;
      } else {
        return NextResponse.json({ message: "Story type not found!" });
      }
    }
  } catch (error: any) {
    console.error("Error fetching Jira projects:", error);
    return NextResponse.json({
      message: "Error fetching projects",
      error: error.message,
    });
  }
}
