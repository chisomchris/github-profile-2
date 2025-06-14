import { Avatar } from "./avatar";

export type GithubUser = {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  bio: string;
  followers: number;
  following: number;
  location: string;
};

export const GithubDetails = ({
  stats,
  html_url,
  avatar_url,
  name = "Github User",
  bio = "",
}: {
  stats: { label: string; value: string | number }[];
  avatar_url: string | undefined;
  html_url: string;
  name: string;
  bio?: string;
}) => {
  return (
    <>
      <div className="flex gap-x-4 gap-y-6 flex-wrap flex-col mb-6 sm:flex-row sm:items-center sm:mb-0">
        <div className="-mt-16 relative mr-4 mb-2">
          <Avatar uri={avatar_url} github={html_url} />
        </div>
        {stats.map((stat, i) => (
          <Stat label={stat.label} value={stat.value} key={i} />
        ))}
      </div>
      <h1 className="text-[2rem] text-primary mt-4">{name}</h1>
      <p className="text-secondary">{bio}</p>
    </>
  );
};

const Stat = ({ label, value }: { label: string; value: string | number }) => {
  if (!String(value)) return null;
  return (
    <div className="bg-black rounded-xl px-4 py-2 -mt-2 text-primary w-fit flex items-center">
      <p>{label}</p>
      <div className="w-[1px] h-[2.25rem] bg-secondary block mx-4"></div>{" "}
      <p> {value}</p>
    </div>
  );
};
