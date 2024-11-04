import data from '@data/projects.json'
import type { IProject } from '@interfaces/projects.interface'

export async function getUserRepos(username: string) {
  // const response = await fetch(
  //   `https://api.github.com/users/${username}/repos?per_page=160`
  // )
  // const data = (await response.json()) as IGitProject[]

  const newData: IProject[] = data.map((repo) => {
    return {
      title: repo.name,
      summary: repo.description,
      date: new Date(repo.created_at),
      tags: repo.topics,
      draft: repo.comments_url === 'No comments yet' ? true : false,
      demoUrl: repo.homepage,
      repoUrl: repo.html_url,
    }
  })

  return newData
}
