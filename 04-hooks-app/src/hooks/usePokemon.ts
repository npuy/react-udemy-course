import { useEffect, useState } from "react";

interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
}

interface UsePokemonProps {
  id: number;
}

export const usePokemon = ({ id }: UsePokemonProps) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getPokemonById = async (id: number) => {
    setIsLoading(true);
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/1");
    const data = await response.json();

    setPokemon({
      id: id,
      name: data.name,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    getPokemonById(id);
  }, [id]);

  return {
    pokemon,
    isLoading,

    formattedId: id.toString().padStart(3, "0"),
  };
};
