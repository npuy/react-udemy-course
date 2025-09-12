import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { CustomHeader } from "./sharded/components/CustomHeader";
import { SearchBar } from "./sharded/components/SearchBar";

import { useGifs } from "./gifs/hooks/useGifs";

export const GifsApp = () => {
  const { previousSearches, gifs, handlePreviousSearchClicked, handleSearch } =
    useGifs();

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
