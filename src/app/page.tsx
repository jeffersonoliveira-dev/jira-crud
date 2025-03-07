"use client";
import { updateIssue } from "@/services/edit";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  const ref = useRef<HTMLTextAreaElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const extractIssueIdFromUrl = (input: string): string | null => {
    const match = input.match(/(?:browse\/)?([A-Z]+-\d+)/);
    return match ? match[1] : null;
  };

  const handleClick = async () => {
    setIsLoading(true);
    const data = {
      fields: {
        description: ref?.current?.value,
      },
    };
    const issueKey = extractIssueIdFromUrl(ref2?.current?.value || '');
    if (!issueKey || !data.fields.description) {
      setIsLoading(false);
      toast.error("issueKey and data are required!");
      return;
    }
    try {
      const response = await updateIssue(issueKey, data);
      if (response) {
        toast.success("Issue updated successfully!");
      }
    } catch (error) {
      toast.error("Error updating issue: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        height: "100vh",
        width: "100vw",
      }}
    >
      <h1>JIRA EDIT</h1>
      <input
        ref={ref2}
        style={{
          padding: "1rem",
          width: "50%",
          fontSize: "1rem",
        }}
        placeholder="URL of the issue or ISSUEID (ex: your-domain.atlassian.net/browse/JIRA-0000 JIRA-0000) here"
      />
      <textarea
        style={{
          width: "50%",
          height: "50%",
          fontSize: "1rem",
        }}
        placeholder="description here"
        ref={ref}
      ></textarea>
      <button
        style={{
          padding: "1rem",
          width: "50%",
          fontSize: "1rem",
          backgroundColor: "blue",
          fontWeight: "bold",
        }}
        disabled={isLoading}
        onClick={handleClick}
      >
        submit
      </button>
      <ToastContainer />
    </div>
  );
}
