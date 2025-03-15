import { ProjectDTO } from "@/app/common/dto/project";

export function convertProjectsToKeyValue(projects: ProjectDTO[]) {
    return projects.map((project) => ({
        key: project.id,
        value: `${project.key} - ${project.name}`,
    }));

}