import { useState } from "react";

import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { CustomHeader } from "./sharded/components/CustomHeader";
import { SearchBar } from "./sharded/components/SearchBar";

import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.action";

import type { Gif } from "./gifs/interfaces/gif.interface";

export const GifsApp = () => {
  const [previousSearches, setPreviousSearches] = useState<string[]>([]);
  const [gifs, setGifs] = useState<Gif[]>([]);

  const handlePreviousSearchClicked = (search: string) => {
    console.log({ search });
  };

  const handleSearch = async (query: string) => {
    if (!query) return;

    const normalizedQuery = query.trim().toLowerCase();
    if (previousSearches.includes(normalizedQuery)) return;

    setPreviousSearches([normalizedQuery, ...previousSearches].splice(0, 6));

    setGifs(await getGifsByQuery(normalizedQuery));
  };

  return (
    <>
      <CustomHeader
        title="Gifs Searcher"
        description="Search for your favorite GIFs"
      />

      <SearchBar placeholder="Search gifs" onQuery={handleSearch} />

      <PreviousSearches
        searches={previousSearches}
        onPreviousSearchClicked={handlePreviousSearchClicked}
      />

      <GifList gifs={gifs} />
    </>
  );
};
