import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { HomePage } from "./HomePage";
import { MemoryRouter } from "react-router";
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoriteHeroProvider } from "@/heroes/context/favorites-hero.context";


vi.mock('@/heroes/hooks/usePaginatedHero');

const mockPaginatedHero = vi.mocked(usePaginatedHero);

mockPaginatedHero.mockReturnValue({
  data: [],
  isLoading: false,
  isError: false,
  isSuccess: true
} as unknown as ReturnType<typeof usePaginatedHero>)

const queryClient = new QueryClient();

const renderHomePage = (initialEntries: string[] = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <FavoriteHeroProvider>
        <QueryClientProvider client={queryClient}>
          <HomePage />
        </QueryClientProvider>
      </FavoriteHeroProvider>
    </MemoryRouter>
  );
}

describe('Home Page', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  })

  test('shuould render HomePae with default values', () => {
    const { container } = renderHomePage();
    expect(container).toMatchSnapshot();
  });

  test('should call usePaginatedHero with default values', () => {
    renderHomePage();

    expect(mockPaginatedHero).toHaveBeenCalledWith(1, 6, 'all');
  });

  test('should call usePaginatedHero with custom query params', () => {
    renderHomePage(['/?page=6&limit=10&category=villians']);

    expect(mockPaginatedHero).toHaveBeenCalledWith(6, 10, 'villians');
  });

  test('should call usePaginatedHero with default page and same limit on diferent page', () => {

    renderHomePage(['/?tab=favorites&page=2&limit=10']);
    const [, , , villians] = screen.getAllByRole('tab');

    fireEvent.click(villians);

    expect(mockPaginatedHero).toHaveBeenCalledWith(2, 10, "villain");
  });


  test('should call usePaginatedHero when heroes are selected', () => {
    vi.clearAllMocks();
    renderHomePage(['/?tab=favorites&page=2&limit=10']);
    const [, , heroes] = screen.getAllByRole('tab');

    fireEvent.click(heroes);

    expect(mockPaginatedHero).toHaveBeenCalledWith(2, 10, "hero");
  });


  test('should call usePaginatedHero when all are selected', () => {
    renderHomePage(['/?tab=favorites&page=2&limit=10']);
    const [all] = screen.getAllByRole('tab');

    fireEvent.click(all);

    expect(mockPaginatedHero).toHaveBeenCalledWith(2, 10, "all");
  });

});