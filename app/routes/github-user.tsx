import { GithubDetails, type GithubUser } from "~/components/github-details";
import type { Route } from "../+types/root";
import { Suspense, useState } from "react";
import { Await } from "react-router";
import { RepoCard, type Repo } from "~/components/repo-card";
import { fetchGithubProfile, fetchGithubUserRepos } from "~/lib/fetchers";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const user = await fetchGithubProfile<GithubUser>(params.user as string);
  const repos = fetchGithubUserRepos<Repo>(user.login);
  return { user, repos };
}

// force the client loader to run during hydration
clientLoader.hydrate = true as const; // `as const` for type inference

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return (
    <div className="text-primary h-[50vh] grid place-items-center">
      <p>Loading...</p>
    </div>
  );
}

export default function GithubUser({ loaderData }: Route.ComponentProps) {
  const { user, repos } = loaderData;
  const [showAll, setShowAll] = useState(false);

  return (
    <>
      <title>{user.name || user.login} Profile</title>
      <GithubDetails
        html_url={user.html_url}
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
            <>
              <ul className="grid gap-6 py-6 lg:grid-cols-2">
                {repos.slice(0, 4).map((repo) => (
                  <RepoCard repo={repo} key={repo.name} />
                ))}
                {showAll
                  ? repos
                      .slice(4)
                      .map((repo) => <RepoCard repo={repo} key={repo.name} />)
                  : null}
              </ul>
              {repos.length > 4 ? (
                <button
                  className="text-primary w-full py-2 mb-4 hover:text-secondary hover:cursor-pointer"
                  onClick={() => setShowAll((v) => !v)}
                >
                  {showAll ? "View less repositories" : "View all repositories"}
                </button>
              ) : null}
            </>
          )}
        </Await>
      </Suspense>
    </>
  );
}
