import { NextResponse } from "next/server";
import { AUTHORIZATION, BASE_URL } from "@/app/common/const";
import axios from "axios";

export async function GET() {
  const startAt = "0";
  const maxResults = "50";

  try {
    const response = await axios.get(`${BASE_URL}/rest/api/2/project/search`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: AUTHORIZATION,
      },
      params: {
        startAt,
        maxResults,
      },
    });

    return NextResponse.json({
      message: "Projects fetched successfully!",
      projects: response.data,
    });
  } catch (error: any) {
    console.error("Error fetching Jira projects:", error);
    return NextResponse.json({
      message: "Error fetching projects",
      error: error.message,
    });
  }
}
