import { useRef, useState } from "react";

import { getGifsByQuery } from "../actions/get-gifs-by-query.action";

import type { Gif } from "../interfaces/gif.interface";

// const gifsCache: Record<string, Gif[]> = {};

export const useGifs = () => {
  const [previousSearches, setPreviousSearches] = useState<string[]>([]);
  const [gifs, setGifs] = useState<Gif[]>([]);

  const gifsCache = useRef<Record<string, Gif[]>>({});

  const handlePreviousSearchClicked = async (search: string) => {
    if (gifsCache.current[search]) {
      setGifs(gifsCache.current[search]);
      return;
    }

    const gifs = await getGifsByQuery(search);
    setGifs(gifs);

    gifsCache.current[search] = gifs;
  };

  const handleSearch = async (query: string) => {
    if (!query) return;

    const normalizedQuery = query.trim().toLowerCase();
    if (previousSearches.includes(normalizedQuery)) return;

    setPreviousSearches([normalizedQuery, ...previousSearches].splice(0, 6));

    const gifs = await getGifsByQuery(normalizedQuery);
    setGifs(gifs);

    gifsCache.current[query] = gifs;
  };

  return {
    previousSearches,
    gifs,

    handlePreviousSearchClicked,
    handleSearch,
  };
};
