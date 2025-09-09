import { heroes, Owner } from "../data/heros.data";

export function getHerosByOwner(owner: Owner) {
  return heroes.filter((hero) => hero.owner === owner);
}
