import { GithubDetails, type GithubUser } from "~/components/github-details";
import type { Route } from "../+types/root";
import { Suspense } from "react";
import { Await } from "react-router";
import { RepoCard, type Repo } from "~/components/repo-card";
import { fetchGithubProfile, fetchGithubUserRepos } from "~/lib/fetchers";

// export async function meta({ params }: Route.MetaArgs) {
//   const user = await fetchGithubProfile<GithubUser>(params.user as string);
//   return [
//     { title: user.name || user.login },
//     {
//       name: "description",
//       content: `${user.name || user.login} Github Profile`,
//     },
//   ];
// }

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const user = await fetchGithubProfile<GithubUser>(params.user as string);
  const repos = fetchGithubUserRepos<Repo>(user.login);
  return { user, repos };
}

// force the client loader to run during hydration
clientLoader.hydrate = true as const; // `as const` for type inference

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function GithubUser({ loaderData }: Route.ComponentProps) {
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
