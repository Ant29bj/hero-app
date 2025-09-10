import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { SearchControls } from "./SearchControls";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router";

if (typeof window.ResizeObserver === 'undefined') {
  class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
  }

  window.ResizeObserver = ResizeObserver;
}

const queryClient = new QueryClient();

const renderSearchControls = (initialEntries?: string[]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <QueryClientProvider client={queryClient}>
        <SearchControls />
      </QueryClientProvider>
    </MemoryRouter>
  );
}

describe('SearchControls', () => {
  test('should render SearchControls with default values', () => {
    const { container } = renderSearchControls();
    expect(container).toMatchSnapshot();
  });

  test('should set input value when search param is set', async () => {
    renderSearchControls(['/?name=batman']);
    const input = screen.getByPlaceholderText('Search heroes, villains, powers, teams...');

    expect(input.getAttribute('value')).toBe('batman');
  });


  test('should change param when handleKeyDown ', async () => {
    renderSearchControls(['/?name=batman']);
    const input = screen.getByPlaceholderText('Search heroes, villains, powers, teams...');

    expect(input.getAttribute('value')).toBe('batman');

    fireEvent.change(input, { target: { value: 'superman' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(input.getAttribute('value')).toBe('superman');
  });
});