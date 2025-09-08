import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { usePaginatedHero } from "./usePaginatedHero";
import { getHeroesByPageAction } from "../actions/get-heroes-by-page.actions";

vi.mock('../actions/get-heroes-by-page.actions', () => ({
  getHeroesByPageAction: vi.fn(),
}));

const mockGetPaginateHeros = vi.mocked(getHeroesByPageAction);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
});
const tanstakCustomProvider = () => {

  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
describe('usePaginatedHero', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
  });

  test('should return the initial state (isLoading)', () => {
    const { result } = renderHook(() => usePaginatedHero(1, 6),
      {
        wrapper: tanstakCustomProvider()
      });

    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    expect(result.current.data).toBeUndefined();
  });

  test('should return succes state with data when API call succeed', async () => {

    const mockHeroData = {
      total: 20,
      pages: 4,
      heroes: []
    }

    mockGetPaginateHeros.mockResolvedValueOnce(mockHeroData);

    const { result } = renderHook(() => usePaginatedHero(1, 6),
      {
        wrapper: tanstakCustomProvider()
      });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    })

    expect(result.current.status).toBe('success');
    expect(mockGetPaginateHeros).toHaveBeenCalled();
    expect(mockGetPaginateHeros).toHaveBeenCalledWith(1, 6, 'all');
  });

  test('should return succes state with data when API call succeed', async () => {

    const mockHeroData = {
      total: 20,
      pages: 4,
      heroes: []
    }

    mockGetPaginateHeros.mockResolvedValueOnce(mockHeroData);

    const { result } = renderHook(() => usePaginatedHero(2, 6, 'heroes'),
      {
        wrapper: tanstakCustomProvider()
      });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    })

    expect(result.current.status).toBe('success');
    expect(mockGetPaginateHeros).toHaveBeenCalled();
    expect(mockGetPaginateHeros).toHaveBeenCalledWith(2, 6, 'heroes');
  });
});