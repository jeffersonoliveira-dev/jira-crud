export interface ProjectDTO {
  id: string;
  key: string;
  name: string;
  projectTypeKey: string;
  simplified: boolean;
  style: string;
  isPrivate: boolean;
  properties: {
    jira: string;
    jiraProjectType: string;
    jiraProjectId: string;
    jiraProjectKey: string;
  };
  avatarUrls: {
    "48x48": string;
    "24x24": string;
    "16x16": string;
    "32x32": string;
  };
  projectCategory: {
    id: string;
    key: string;
    name: string;
    description: string;
    avatarId: number;
  };
  self: string;
  expand: string;
  archived: boolean;
  deleted: boolean;
  issueTypes: {
    id: string;
    name: string;
    subtask: boolean;
    avatarId: number;
    description: string;
    iconUrl: string;
    self: string;
    expand: string;
  }[];
  assigneeType: string;
  components: {
    self: string;
    id: string;
    name: string;
    isAssigneeTypeValid: boolean;
  }[];
  versions: {
    self: string;
    id: string;
    name: string;
    archived: boolean;
    released: boolean;
    overdue: boolean;
    userReleaseDate: string;
    userStartDate: string;
    expand: string;
  }[];
  nameTranslation: string;
  descriptionTranslation: string;
  lead: {
    self: string;
    key: string;
    name: string;
    avatarUrls: {
      "48x48": string;
      "24x24": string;
      "16x16": string;
      "32x32": string;
    };
    displayName: string;
    active: boolean;
    timeZone: string;
    accountType: string;
  };
}
