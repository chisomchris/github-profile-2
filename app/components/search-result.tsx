import { Link, useFetcher } from "react-router";

export const SearchResult = ({
  setShowSearchResult,
}: {
  setShowSearchResult: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const fetcher = useFetcher({ key: "search" });
  return (
    <ul className="grid gap-4 mx-auto md:w-lg">
      {fetcher.data && fetcher.data.items.length > 0
        ? fetcher.data.items.map((item) => (
            <li key={item.login} onClick={() => setShowSearchResult(false)}>
              <Link
                to={encodeURIComponent(item.login)}
                className="bg-black p-4 rounded-xl list-none flex gap-3 flex-nowrap items-center"
              >
                <img
                  src={item.avatar_url}
                  alt={item.login}
                  className="w-18 h-18 rounded"
                />
                <div>
                  <h2 className="text-primary text-[1.25rem]/5 line-clamp-2">
                    {item.name || item.login}
                  </h2>
                  <p className="text-secondary h-6 line-clamp-1">{item.bio}</p>
                </div>
              </Link>
            </li>
          ))
        : null}
    </ul>
  );
};
