import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { searchHeroActions } from "@/heroes/actions/get-hero-filter.action";
import SearchPage from "./SearchPage";
import type { Hero } from "@/heroes/types/hero.interface";



vi.mock('@/heroes/actions/get-hero-filter.action');
const mockSearchHeroActions = vi.mocked(searchHeroActions);

vi.mock('@/components/custom/CustomJumbotron', () => ({
  CustomJumbotorn: () => <div data-testid='custom-jumbotron'></div>
}));


vi.mock('@/heroes/components/HeroGrid', () => ({
  HeroGrid: ({ heroes }: { heroes: Hero[] }) => (
    <div data-testid='hero-grid'>
      {heroes.map((hero) => (
        <div key={hero.id}>{hero.name}</div>
      ))}
    </div>)
}));



vi.mock('./ui/SearchControls', () => ({
  SearchControls: () => <div data-testid='search-controls'></div>
}));


const queryClient = new QueryClient();

const renderSearchPage = (initialEntries?: string[]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <QueryClientProvider client={queryClient}>
        <SearchPage />
      </QueryClientProvider>
    </MemoryRouter>
  );
}

describe('Search Page', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should render the component', () => {
    const { container } = renderSearchPage();

    expect(container).toMatchSnapshot();
  });

  test('should call searchHeroActions with default values', () => {
    renderSearchPage();

    expect(mockSearchHeroActions).toHaveBeenCalledWith({
      "category": "",
      "name": "",
      "status": "",
      "strength": 0,
      "team": "",
      "universe": "",
    });
  });

  test('should call search action with correct parameters', () => {
    renderSearchPage(['/search?category=&name=superman&status=active&strength=5']);

    expect(mockSearchHeroActions).toHaveBeenCalledWith({
      category: "",
      name: "superman",
      status: "active",
      strength: 5,
      team: "",
      universe: ""
    });
  });

  test('should render HeroGrid with search result', async () => {
    const mockHeroes = [
      {
        id: 1,
        name: 'superman'
      } as unknown as Hero,
      {
        id: 2,
        name: 'batman'
      } as unknown as Hero
    ];

    mockSearchHeroActions.mockResolvedValue(mockHeroes);

    renderSearchPage();

    await waitFor(() => {
      expect(screen.getByText('superman')).toBeDefined();
      expect(screen.getByText('batman')).toBeDefined();
    });
  });
});