import { GitUser, GitRepository, GitActivity } from "../entities";

export async function getUserByUsername(username: string): Promise<GitUser> {
  return fetch(`https://api.github.com/users/${username}`).then(
    (resp) => resp.json() as unknown as GitUser,
  );
}

export async function getRepositoriesByUsername(
  username: string,
): Promise<GitRepository[]> {
  return fetch(
    `https://api.github.com/users/${username}/repos?per_page=100`,
  ).then((resp) => resp.json() as unknown as GitRepository[]);
}

export async function getMarkdownFromRepository(
  repo: GitRepository,
): Promise<string> {
  return fetch(
    "https://raw.githubusercontent.com/" +
      repo.owner.login +
      "/" +
      repo.name +
      "/master/README.md",
  ).then((resp) => resp.text());
}

export async function getReadmeByUsername(username: String): Promise<string> {
  return fetch(
    "https://raw.githubusercontent.com/" +
      username +
      "/" +
      username +
      "/master/README.md",
  ).then((resp) => resp.text());
}

export async function getActivityByUsername(
  username: string,
): Promise<GitActivity[]> {
  const activities = await fetch(
    `https://api.github.com/users/${username}/events?per_page=100`,
  ).then((resp) => resp.json() as unknown as GitActivity[]);

  await Promise.all(
    activities
      .filter(
        (activity) =>
          activity.type === "PushEvent" &&
          !activity.payload.commits &&
          activity.payload.head &&
          activity.payload.before,
      )
      .map(async (activity) => {
        try {
          const resp = await fetch(
            `https://api.github.com/repos/${activity.repo.name}/compare/${activity.payload.before}...${activity.payload.head}`,
          );
          const data = await resp.json();
          if (data.commits) {
            activity.payload.commits = data.commits.map(
              (c: {
                commit: {
                  author: { email: string; name: string };
                  message: string;
                };
                url: string;
              }) => ({
                author: c.commit.author,
                message: c.commit.message,
                url: c.url,
              }),
            );
          }
        } catch {
          activity.payload.commits = [
            {
              author: { email: "", name: "" },
              message: `${activity.payload.size || 1} commit(s)`,
              url: "",
            },
          ];
        }
      }),
  );

  return activities;
}
