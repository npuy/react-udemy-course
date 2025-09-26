import { getHeroAction } from "@/heroes/actions/get-hero.action";
import HeroProfile from "@/heroes/components/HeroProfile";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router";

export const HeroPage = () => {
  const { idSlug } = useParams();

  console.log({ idSlug });

  const { data: hero, isError } = useQuery({
    queryKey: ["hero", idSlug],
    queryFn: () => getHeroAction(idSlug),
    staleTime: 1000 * 60 * 5, // 5 min
  });

  if (isError) return <Navigate to="/" />;

  if (!hero) return <h1>Loading ...</h1>;

  return <HeroProfile hero={hero} />;
};
