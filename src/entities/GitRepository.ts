import { GitUser } from "./GitUser";

export interface GitRepository {
    html_url: string,
    name: string,
    owner: GitUser,
    description: string,
    fork: boolean,
    forks_count: number,
    stargazers_count: number,
    open_issues_count: number,
    watchers_count: number,
    default_branch: string,
    license: GitLicense,
    created_at: string,
}

interface GitLicense {
    key: string,
    name: string,
    spdx_id: string,
}