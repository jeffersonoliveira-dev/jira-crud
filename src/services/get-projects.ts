"use client";
import axios from "axios";

export const getProjects = async () => {
  return await axios.get("api/jira/get-projects");
};
