"use client";
import { createStory } from "@/services/create";
import { getProjects } from "@/services/get-projects";
import { convertURItoIssueLink } from "@/utils/convertURItoIssueLink";
import { convertProjectsToKeyValue } from "@/utils/projects";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

interface ProjectKV {
  key: string;
  value: string;
}

export function Create() {
  const refSummary = useRef<HTMLInputElement>(null);
  const refDescription = useRef<HTMLTextAreaElement>(null);
  const [projects, setProjects] = useState<ProjectKV[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectKV>({
    key: "default",
    value: "Select Project",
  });
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleProjects = async () => {
    setIsLoadingProjects(true);
    try {
      const response = await getProjects();

      if (response && response.data) {
        console.log("projects: ", response.data?.projects?.values);
        setProjects(convertProjectsToKeyValue(response.data?.projects?.values));
      } else {
        toast.error("Error fetching projects");
      }
    } catch (error) {
      toast.error("Error fetching projects");
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoadingProjects(false);
    }
  };

  useEffect(() => {
    handleProjects();
  }, []);

  const handleStoryCreation = async () => {
    if (
      !refSummary.current?.value ||
      !refDescription.current?.value ||
      selectedProject?.key === "default"
    ) {
      toast.error("All fields are required!");
      return;
    }
    setIsCreating(true);

    const createStoryPayload = {
      fields: {
        summary: refSummary.current?.value,
        description: refDescription.current?.value,
        project: {
          id: selectedProject?.key,
        },
      },
    };
    try {
      const response = await createStory(createStoryPayload);

      if (response && response?.data) {
        toast.success(
          <div
            onClick={() =>
              window.open(
                convertURItoIssueLink(
                  response.data.issue.self,
                  response.data.issue.key
                ),
                "_blank"
              )
            }
          >
            <h4>Issue created successfully!</h4>
            <h4>
              Issue Key: <strong>{response.data.issue.key}</strong>
            </h4>
          </div>
        );
      } else {
        toast.error("Error creating Jira issue");
      }
    } catch (error) {
      toast.error("Error creating Jira issue");
      console.error("Error creating Jira issue:", error);
    } finally {
      setIsCreating(false);
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
      <h1>JIRA CREATE</h1>
      <select
        disabled={isLoadingProjects}
        style={{
          padding: "1rem",
          width: "50%",
          fontSize: "1rem",
        }}
        value={selectedProject.key}
        onChange={(e) => {
          const selectedProject = projects.find(
            (project) => project.key === e.target.value
          );
          if (selectedProject) {
            setSelectedProject(selectedProject);
          }
        }}
      >
        <option
          style={{
            padding: "1rem",
            width: "50%",
            fontSize: "1rem",
          }}
          disabled
          value={"default"}
        >
          {isLoadingProjects ? "Loading Projects..." : "Select Project"}
        </option>
        {projects.map((project) => (
          <option
            style={{
              padding: "1rem",
              width: "50%",
              fontSize: "1rem",
            }}
            key={project.key}
            value={project.key}
          >
            {project.value}
          </option>
        ))}
      </select>
      <input
        ref={refSummary}
        style={{
          padding: "1rem",
          width: "50%",
          fontSize: "1rem",
        }}
        placeholder="Summary here"
      />
      <textarea
        style={{
          width: "50%",
          height: "50%",
          fontSize: "1rem",
        }}
        placeholder="  description here"
        ref={refDescription}
      ></textarea>
      <button
        style={{
          padding: "1rem",
          width: "50%",
          fontSize: "1rem",
          backgroundColor: "blue",
          fontWeight: "bold",
        }}
        disabled={isCreating}
        onClick={handleStoryCreation}
      >
        CREATE JIRA STORY
      </button>
    </div>
  );
}
