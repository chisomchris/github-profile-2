import { Link } from "react-router";

export const Avatar = ({
  uri,
  github,
}: {
  uri: string | undefined;
  github: string;
}) => {
  return (
    <Link to={github}>
      <div className="w-36 aspect-square rounded-3xl bg-black border border-12 border-ash-1 overflow-hidden">
        <img src={uri} alt="" />
      </div>
    </Link>
  );
};
