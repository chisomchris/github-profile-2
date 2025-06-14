export async function fetchGithubProfile<T>(user: string): Promise<T> {
  const res = await fetch(`https://api.github.com/users/${user}`);
  const data = await res.json();
  return data;
}

export async function fetchGithubUserRepos<T>(user = ""): Promise<T[]> {
  if (!user) {
    throw new Error("No user provided");
  }
  const res = await fetch(`https://api.github.com/users/${user}/repos`);
  const data = await res.json();
  return data;
}

export async function searchGithubUser<T>(user: string): Promise<T> {
  const res = await fetch(`https://api.github.com/search/users?q=${user}`);
  const data = await res.json();
  return data;
}
