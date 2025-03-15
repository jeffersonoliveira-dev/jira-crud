export function convertURItoIssueLink(uri: string, key: string): string {
  const match = uri.match(/https:\/\/(.+?)\/rest\/api\/2\/issue\/(\d+)/);
  if (!match) {
    throw new Error("Invalid URI format");
  }
  const [, domain] = match;
  return `https://${domain}/browse/${key}`;
}
