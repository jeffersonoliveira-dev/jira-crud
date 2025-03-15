import { base64Encode } from "@/utils/base64Encode";

export const BASE_URL = process.env.JIRA_DOMAIN;

export const JIRA_EMAIL = process.env.JIRA_EMAIL;

export const JIRA_TOKEN = process.env.JIRA_TOKEN;

export const AUTHORIZATION = `Basic ${base64Encode(
  `${JIRA_EMAIL}:${JIRA_TOKEN}`
)}`;
