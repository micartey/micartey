import { GitUser } from ".";

export interface GitActivity {
    type: string
    repo: Repo
    created_at: string
    payload: Payload
}

interface Payload {
    commits?: Commit[]
    issue?: Issue
}

interface Commit {
    author: Author
    message: string
    url: string
}

interface Issue {
    url: string
    title: string
    user: GitUser
}

interface Author {
    email: string
    name: string
}

interface Repo {
    id: number
    name: string
    url: string
}