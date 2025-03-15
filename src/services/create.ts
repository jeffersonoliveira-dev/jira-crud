"use client";
import axios from "axios";

export interface CreateStoryPayload {
  fields: {
    summary?: string;
    description?: string;
    project: {
      id: string;
    };
  };
}

export const createStory = async (createStoryPayload: CreateStoryPayload) => {
  return await axios.post("api/jira/post-issue", createStoryPayload);
};
