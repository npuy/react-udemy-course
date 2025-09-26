import { heroApi } from "../api/hero.api";
import type { Hero } from "../types/hero.interface";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getHeroAction = async (idSlug: string = "clark-kent") => {
  const { data: hero } = await heroApi.get<Hero>(`/${idSlug}`);

  return {
    ...hero,
    image: `${BASE_URL}/images/${hero.image}`,
  };
};
