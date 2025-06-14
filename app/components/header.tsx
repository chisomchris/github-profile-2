import heroImg from "~/resources/hero-image.jpg";
import heroImgSm from "~/resources/hero-image-sm.jpg";
import { Search } from "./search";
import { SearchResult } from "./search-result";
import { useState } from "react";

export const Header = () => {
  const [showSearchResult, setShowSearchResult] = useState(false);
  return (
    <header>
      <div>
        <picture>
          <source media="(max-width: 639px)" srcSet={heroImgSm} />
          <source media="(min-width: 640px)" srcSet={heroImg} />
          <img
            src={heroImg}
            alt="Galaxy of stars with a purple gradient background"
            className="w-full min-h-48 max-h-64 object-cover"
          />
        </picture>

        <div className="absolute top-10 w-11/12 left-1/2 -translate-x-1/2 z-10">
          <Search setShowSearchResult={setShowSearchResult}/>
          {showSearchResult && (
            <SearchResult setShowSearchResult={setShowSearchResult} />
          )}
        </div>
      </div>
    </header>
  );
};
