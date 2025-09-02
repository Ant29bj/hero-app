import { heroApi } from "../api/hero.api";
import type { Hero } from "../types/hero.interface";

interface Options {
  name?: string;
  team?: string;
  category?: string;
  universe?: string;
  status?: string;
  strength?: number;
}
const BASE_URL = import.meta.env.VITE_API_URL;



export const searchHeroActions = async (opt: Options): Promise<Hero[]> => {
  const { name, team, category, universe, status, strength } = opt;
  if (!name && !team && !category && !universe && !status && !strength) {
    return [];
  }

  console.log({ opt })

  const { data } = await heroApi.get<Hero[]>('/search', {
    params: { ...opt },

  });

  const heroes: Hero[] = data.map((heroe) => ({
    ...heroe,
    image: `${BASE_URL}/images/${heroe.image}`
  }))


  return heroes;
}