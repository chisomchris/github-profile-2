export type Repo = {
  name: string;
  description: string;
  html_url: string;
  updated_at: string;
  forks_count: number;
  stargazers_count: number;
  license: null | {
    key: string;
    name: string;
    spdx_id: string;
  };
};

import forkImage from "~/resources/Nesting.svg";
import licenseImage from "~/resources/Chield_alt.svg";
import starImage from "~/resources/Star.svg";
import { Link } from "react-router";

export const RepoCard = ({ repo }: { repo: Repo }) => {
  return (
    <Link to={repo.html_url}>
      <div className="repo-card rounded-xl px-6 py-4 text-decoration-none hover:scale-101">
        <h2 className="text-primary leading-10 font-semibold">{repo.name}</h2>
        <p className="text-secondary">{repo.description}</p>
        <div className="text-secondary flex gap-x-4 gap-y-6 pt-4 flex-wrap items-end">
          {repo.license ? (
            <p className="flex items-center">
              <img src={licenseImage} alt="" />
              <span>{repo.license.spdx_id}</span>
            </p>
          ) : null}

          <p className="flex items-center">
            <img src={forkImage} alt="" />
            <span>{repo.forks_count}</span>
          </p>
          <p className="flex items-center">
            <img src={starImage} alt="" />
            <span>{repo.stargazers_count}</span>
          </p>
          <p className="text-sm">{formatDate(repo.updated_at)}</p>
        </div>
      </div>
    </Link>
  );
};

// format date to be relative to now
const formatDate = (date: string) => {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 3600));
  const days = Math.floor(diff / (1000 * 3600 * 24));
  const months = Math.floor(diff / (1000 * 3600 * 24 * 30));
  const years = Math.floor(diff / (1000 * 3600 * 24 * 365));
  if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
  if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return "just now";
};
