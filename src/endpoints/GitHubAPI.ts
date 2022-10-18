import { GitUser, GitRepository, GitActivity } from '../entities'

export async function getUserByUsername(username: string): Promise<GitUser> {
  return fetch(`https://api.github.com/users/${username}`)
    .then((resp) => resp.json() as unknown as GitUser)
}

export async function getRepositoriesByUsername(username: string): Promise<GitRepository[]> {
  return fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
    .then((resp) => resp.json() as unknown as GitRepository[])
}

export async function getMarkdownFromRepository(repo: GitRepository): Promise<string> {
  return fetch('https://raw.githubusercontent.com/' + repo.owner.login + '/' + repo.name + '/master/README.md')
    .then((resp) => resp.text())
}

export async function getReadmeByUsername(username: String): Promise<string> {
  return fetch('https://raw.githubusercontent.com/' + username + '/' + username + '/master/README.md')
    .then((resp) => resp.text())
}

export async function getActivityByUsername(username: string): Promise<GitActivity[]> {
  return fetch(`https://api.github.com/users/${username}/events?per_page=100`)
    .then((resp) => resp.json() as unknown as GitActivity[])
}