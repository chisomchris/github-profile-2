import { GithubDetails, type GithubUser } from "~/components/github-details";
import type { Route } from "./+types/home";
import { RepoCard, type Repo } from "~/components/repo-card";
import { Suspense } from "react";
import { Await } from "react-router";
import { fetchGithubProfile, fetchGithubUserRepos } from "~/lib/fetchers";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Github Profile" },
    { name: "description", content: "Github Profile" },
  ];
}

export async function clientLoader({}: Route.ClientLoaderArgs) {
  try {
    const user = await fetchGithubProfile<GithubUser>("github");
    const repos = fetchGithubUserRepos<Repo>(user.login);
    return { user, repos };
  } catch (error) {
    if (error instanceof Error) {
      throw new Response(error.message, { status: 500 });
    }
    throw new Response("An unexpected error occurred", { status: 500 });
  }
}

// force the client loader to run during hydration
clientLoader.hydrate = true as const; // `as const` for type inference

export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { user, repos } = loaderData;
  return (
    <>
      <GithubDetails
        avatar_url={user.avatar_url}
        stats={[
          { label: "Followers", value: user.followers },
          { label: "Following", value: user.following },
          { label: "Location", value: user.location || "" },
        ]}
        name={user.name || "Github"}
        bio={user.bio || ""}
      />

      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={repos} errorElement={<p>Error occured</p>}>
          {(repos) => (
            <ul className="grid gap-6 py-6 lg:grid-cols-2">
              {repos.map((repo) => (
                <RepoCard repo={repo} key={repo.name} />
              ))}
            </ul>
          )}
        </Await>
      </Suspense>

      <button className="text-primary w-full py-2 hover:text-secondary hover:cursor-pointer">
        View all repositories
      </button>
    </>
  );
}
