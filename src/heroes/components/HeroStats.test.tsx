import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { HeroStats } from "./HeroStats";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useHeroSummary } from "../hooks/useHeroSumary";
import type { SumaryInfromationResponse } from "../types/sumary-infromation.response";
import { FavoriteHeroProvider } from "../context/favorites-hero.context";
import { L } from "vitest/dist/chunks/reporters.d.BFLkQcL6.js";

const mockHero = {
  "id": "1",
  "name": "Clark Kent",
  "slug": "clark-kent",
  "alias": "Superman",
  "powers": [
    "Súper fuerza",
    "Vuelo",
    "Visión de calor",
    "Visión de rayos X",
    "Invulnerabilidad",
    "Súper velocidad"
  ],
  "description": "El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.",
  "strength": 10,
  "intelligence": 8,
  "speed": 9,
  "durability": 10,
  "team": "Liga de la Justicia",
  "image": "1.jpeg",
  "firstAppearance": "1938",
  "status": "Active",
  "category": "Hero",
  "universe": "DC"
}

const mockSummaryData: SumaryInfromationResponse = {
  "totalHeroes": 25,
  "strongestHero": {
    "id": "1",
    "name": "Clark Kent",
    "slug": "clark-kent",
    "alias": "Superman",
    "powers": [
      "Súper fuerza",
      "Vuelo",
      "Visión de calor",
      "Visión de rayos X",
      "Invulnerabilidad",
      "Súper velocidad"
    ],
    "description": "El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.",
    "strength": 10,
    "intelligence": 8,
    "speed": 9,
    "durability": 10,
    "team": "Liga de la Justicia",
    "image": "1.jpeg",
    "firstAppearance": "1938",
    "status": "Active",
    "category": "Hero",
    "universe": "DC"
  },
  "smartestHero": {
    "id": "2",
    "name": "Bruce Wayne",
    "slug": "bruce-wayne",
    "alias": "Batman",
    "powers": [
      "Artes marciales",
      "Habilidades de detective",
      "Tecnología avanzada",
      "Sigilo",
      "Genio táctico"
    ],
    "description": "El Caballero Oscuro de Ciudad Gótica, que utiliza el miedo como arma contra el crimen y la corrupción.",
    "strength": 6,
    "intelligence": 10,
    "speed": 6,
    "durability": 7,
    "team": "Liga de la Justicia",
    "image": "2.jpeg",
    "firstAppearance": "1939",
    "status": "Active",
    "category": "Hero",
    "universe": "DC"
  },
  "heroCount": 18,
  "villainCount": 7
}


vi.mock('../hooks/useHeroSumary');
const mockUseHeroSumary = vi.mocked(useHeroSummary);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
});

const renderHeroStats = (mockData?: Partial<SumaryInfromationResponse>) => {

  if (mockData) {
    mockUseHeroSumary.mockReturnValue({
      data: mockData,
    } as unknown as ReturnType<typeof useHeroSummary>);
  } else {
    mockUseHeroSumary.mockReturnValue({
      data: undefined,
      isLoading: true
    } as unknown as ReturnType<typeof useHeroSummary>);
  }


  return render(
    <QueryClientProvider client={queryClient}>
      <FavoriteHeroProvider>
        <HeroStats />
      </FavoriteHeroProvider>
    </QueryClientProvider>
  );
}

describe('HeroStats', () => {

  test('should render component with default values', () => {
    renderHeroStats();

    expect(screen.getByText('Loading ...')).toBeDefined();
  });

  test('should render component with mock data', () => {
    const { container } = renderHeroStats(mockSummaryData);
    screen.debug();
    expect(container).toMatchSnapshot();
  });

  test('should update percentaje of favorites', () => {
    localStorage.setItem('favorites', JSON.stringify([mockHero]));
    renderHeroStats(mockSummaryData);

    const favoritePercentajeElement = screen.getByTestId('favorite-percentage');
    const favoriteCount = screen.getByTestId('favorite-count');

    expect(favoritePercentajeElement.textContent).toContain('4.00%');
    expect(favoriteCount.textContent).toContain('1')
  });
});