import { describe, expect, test, vi } from "vitest";
import { renderHook, waitFor } from '@testing-library/react';
import { useHeroSummary } from "./useHeroSumary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getSummaryAction } from '../actions/get-sumary.action';
import type { PropsWithChildren } from "react";
import type { SumaryInfromationResponse } from "../types/sumary-infromation.response";

vi.mock('../actions/get-sumary.action', () => ({
  getSummaryAction: vi.fn(),
}));

const mockGetSummaryAction = vi.mocked(getSummaryAction);

const tanstakCustomProvider = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  });
  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('useHeroSumary', () => {
  test('should return the inital state', () => {
    const { result } = renderHook(() => useHeroSummary(),
      {
        wrapper: tanstakCustomProvider()
      })

    expect(result.current.isEnabled).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBe(undefined);
    expect(result.current.data).toBeUndefined();
  });

  test('should return succes state with data when API call succeeds', async () => {

    const mockSummaryData = {
      totalHeroes: 10,
      strongestHero: {
        id: '1',
        name: "Superman"
      },
      smartestHero: {
        id: '2',
        name: "Batman"
      },
      heroCount: 18,
      villainCount: 7
    } as SumaryInfromationResponse;

    mockGetSummaryAction.mockResolvedValue(mockSummaryData);

    const { result } = renderHook(() => useHeroSummary(),
      {
        wrapper: tanstakCustomProvider()
      });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(false);
    });

    expect(result.current.isError).toBeFalsy();
    expect(mockGetSummaryAction).toHaveBeenCalled();
  });

  test('should return error state when API call fails', async () => {
    const mockError = new Error('Failed to fetch summary');


    mockGetSummaryAction.mockRejectedValue(mockError);

    const { result } = renderHook(() => useHeroSummary(),
      {
        wrapper: tanstakCustomProvider()
      });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.isError).toBeDefined();
    expect(mockGetSummaryAction).toHaveBeenCalled();
  });
});