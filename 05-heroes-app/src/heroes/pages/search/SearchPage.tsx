import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { SearchControls } from "./ui/SearchControls";
import { HeroStats } from "@/heroes/components/HeroStats";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { useQuery } from "@tanstack/react-query";
import { searchHeroAction } from "@/heroes/actions/search-heroes.action";
import { useSearchParams } from "react-router";
import { HeroGrid } from "@/heroes/components/HeroGrid";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const name = searchParams.get("q") ?? undefined;
  const team = searchParams.get("team") ?? undefined;
  const category = searchParams.get("category") ?? undefined;
  const universe = searchParams.get("universe") ?? undefined;
  const status = searchParams.get("status") ?? undefined;
  const strength = searchParams.get("strength") ?? undefined;

  const { data: heroes } = useQuery({
    queryKey: [
      "search",
      {
        name,
        team,
        category,
        universe,
        status,
        strength,
      },
    ],
    queryFn: () =>
      searchHeroAction({
        name,
        team,
        category,
        universe,
        status,
        strength,
      }),
    staleTime: 1000 * 60 * 5, // 5 min
  });

  return (
    <>
      {/* Header */}
      <CustomJumbotron
        title="Search Superhero"
        description="Discover, explore, and manage your favorite superheroes and villains"
      />

      <CustomBreadcrumbs currentPage="Search Heroes" />

      <HeroStats />

      <SearchControls />

      <HeroGrid heroes={heroes ?? []} />
    </>
  );
};

export default SearchPage;
