import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { SearchControls } from "./ui/SearchControls";
import { HeroStats } from "@/heroes/components/HeroStats";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";

export const SearchPage = () => {
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
    </>
  );
};

export default SearchPage;
