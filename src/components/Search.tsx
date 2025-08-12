import Fuse from "fuse.js";
import { useEffect, useMemo, useRef, useState } from "react";
import SearchResultList from "./SearchResultList";
import { pick } from "lodash-es";

export type SearchItem = {
  type: string;
  title: string;
  description?: string;
  verbatim?: string;
  url?: string;
  pubDatetime?: Date | string | null;
  modDatetime?: Date | string | null;
  tags?: string[];
  slug?: string;
};

interface Props {
  searchList: SearchItem[];
}

interface SearchResult {
  item: SearchItem;
  refIndex: number;
}

const MIN_QUERY_LENGTH = 1;

export default function SearchBar({ searchList }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputVal, setInputVal] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(
    null
  );

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputVal(e.currentTarget.value);
  };

  const fuse = useMemo(
    () =>
      new Fuse(searchList, {
        keys: ["title", "description", "tags", "verbatim"],
        ignoreLocation: true,
        includeMatches: true,
        minMatchCharLength: 2,
        threshold: 0.1,
      }),
    [searchList]
  );

  useEffect(() => {
    // if URL has search query,
    // insert that search query in input field
    const searchUrl = new URLSearchParams(window.location.search);
    const searchStr = searchUrl.get("q");
    if (searchStr) setInputVal(searchStr);

    // put focus cursor at the end of the string
    setTimeout(function () {
      inputRef.current!.selectionStart = inputRef.current!.selectionEnd =
        searchStr?.length || 0;
    }, 50);
  }, []);

  useEffect(() => {
    // Add search result only if
    // input value is more than n characters
    let inputResult =
      inputVal.length > MIN_QUERY_LENGTH ? fuse.search(inputVal) : [];
    setSearchResults(inputResult);

    // Update search string in URL
    if (inputVal.length > 0) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("q", inputVal);
      const newRelativePathQuery =
        window.location.pathname + "?" + searchParams.toString();
      history.replaceState(history.state, "", newRelativePathQuery);
    } else {
      history.replaceState(history.state, "", window.location.pathname);
    }
  }, [inputVal]);

  return (
    <>
      <label className="relative block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2 opacity-75">
          <span className="material-symbols-outlined block">search</span>
          <span className="sr-only">Search</span>
        </span>
        <input
          className="my-4 block w-full rounded border 
        border-skin-fill border-opacity-40 bg-skin-fill py-3 pl-10
        pr-3 placeholder:text-opacity-75 
        focus:border-skin-accent focus:outline-none"
          placeholder="Search for anything"
          type="text"
          name="search"
          value={inputVal}
          onChange={handleChange}
          autoComplete="off"
          // autoFocus
          ref={inputRef}
        />
      </label>

      {inputVal.length > MIN_QUERY_LENGTH ? (
        <div className="mt-8">
          Found {searchResults?.length}
          {searchResults?.length && searchResults?.length === 1
            ? " result"
            : " results"}{" "}
          for '{inputVal}'
        </div>
      ) : inputVal.length === 0 ? (
        <div className="mt-8">Search results will appear here</div>
      ) : (
        <div className="mt-8">Keep typing to search</div>
      )}
      {!!searchResults?.length && <SearchResultList list={searchResults} />}
    </>
  );
}
