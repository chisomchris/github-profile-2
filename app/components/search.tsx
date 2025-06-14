import { useState } from "react";
import { useFetcher } from "react-router";
import icon from "~/resources/Search.svg";

export const Search = ({
  setShowSearchResult,
}: {
  setShowSearchResult: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const fetcher = useFetcher({ key: "search" });
  const [val, setVal] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
    !e.target.value && setShowSearchResult(false);
  };

  return (
    <fetcher.Form
      role="search"
      action="/search"
      method="post"
      onSubmit={() => {
        setShowSearchResult(true);
      }}
      className="bg-ash-1 rounded-xl p-3 flex flex-nowrap gap-4 items-center mx-auto mb-4 md:w-lg"
    >
      <button type="submit">
        <img src={icon} alt="Search icon" />
      </button>
      <input
        value={val}
        type="search"
        name="q"
        required
        placeholder="username"
        className="w-full text-primary outline-none bg-transparent autofill:bg-red-500"
        onChange={handleChange}
        //onBlur={() => {
        //setShowSearchResult(false);
        //}}
      />
    </fetcher.Form>
  );
};
