import { heroApi } from "../api/hero.api"
import type { HeroesResponse } from "../types/get-heroes.response";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function getHeroesByPageAction(
  page: number,
  limit: number = 6,
  category: string
): Promise<HeroesResponse> {
  if (isNaN(page)) {
    page = 1;
  }
  if (isNaN(limit)) {
    limit = 6;
  }

  const { data } = await heroApi.get<HeroesResponse>(`/`, {
    params: {
      limit,
      offset: (page - 1) * limit,
      category
    }
  });

  const heroes = data.heroes.map((heroe) => ({
    ...heroe,
    image: `${BASE_URL}/images/${heroe.image}`
  }))

  return {
    ...data,
    heroes
  }
}

