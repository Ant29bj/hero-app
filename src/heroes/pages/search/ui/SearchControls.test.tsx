import { fireEvent, render, screen } from "@testing-library/react";
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

  test('should change param strenght when slider changed', () => {
    renderSearchControls(['/?active-accordion=advance-filters']);

    const slider = screen.getByRole('slider');

    expect(slider.getAttribute('aria-valuenow')).toBe('0');

    fireEvent.keyDown(slider, { key: 'ArrowRight' });

    expect(slider.getAttribute('aria-valuenow')).toBe('1');
  });


  test('should open accordeon with active-accordion=advance-filters', () => {
    renderSearchControls(['/?active-accordion=advance-filters']);

    const accordion = screen.getByTestId('accordion');
    const accordionItem = accordion.querySelector('div');

    expect(accordionItem?.getAttribute('data-state')).toBe('open');
  });


  test('should close accordeon when active-accordion is not set', () => {
    renderSearchControls(['/?active-accordion=']);

    const accordion = screen.getByTestId('accordion');
    const accordionItem = accordion.querySelector('div');

    expect(accordionItem?.getAttribute('data-state')).toBe('closed');
  });
});