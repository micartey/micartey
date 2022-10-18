export interface GitActivity {
    type: string
    repo: Repo
    created_at: string
    paylaod: Payload
}

interface Payload {
    commits: Commit[]
}

interface Commit {
    author: Author
    message: string
    url: string
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