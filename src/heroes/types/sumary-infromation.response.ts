import type { Hero } from "./hero.interface";

export interface SumaryInfromationResponse {
  totalHeroes: number;
  strongestHero: Hero;
  smartestHero: Hero;
  heroCount: number;
  villainCount: number;
}
