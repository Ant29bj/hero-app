import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { FavoriteHeroContext, FavoriteHeroProvider } from "./favorites-hero.context";
import { use } from "react";
import type { Hero } from "../types/hero.interface";

const mockHero = {
  id: '1',
  name: 'batman'
} as Hero;

const TestComponent = () => {

  const { favoriteCount, favorites, isFavorite, toggleFavorite } = use(FavoriteHeroContext);

  return (
    <div>
      <div data-testId='favoriteCount'>{favoriteCount}</div>
      <div data-testId='favoritesLenght'>{favorites.length}</div>

      <button
        onClick={() => toggleFavorite(mockHero)}
        data-testId='toggle-favorite'>
        Toggle favorite
      </button>
      <div data-testId='is-favorite'>{isFavorite(mockHero).toString()}</div>
    </div>
  );
}

const renderTestComponent = () => {
  return render(
    <FavoriteHeroProvider >
      <TestComponent />
    </FavoriteHeroProvider>);
}


describe('favorites-hero.context', () => {


  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test('should initialize with default values', () => {
    renderTestComponent();

    expect(screen.getByTestId('favoriteCount').textContent).toBe('0');
    expect(screen.getByTestId('favoritesLenght').textContent).toBe('0');
  });



  test('should toggle favorite when toggleFavorites is called', () => {
    // Mock 
    renderTestComponent();
    const button = screen.getByTestId('toggle-favorite');

    // Act 
    fireEvent.click(button);

    // Assert
    expect(screen.getByTestId('favoriteCount').textContent).toBe('1');
    expect(screen.getByTestId('is-favorite').textContent).toBe('true');
    expect(screen.getByTestId('favoritesLenght').textContent).toBe('1');
    expect(localStorage.getItem('favorites')).toBe('[{"id":"1","name":"batman"}]')
  });

  test('should toggle favorite to false when toggleFavorites is called', () => {
    // Mock 
    localStorage.setItem('favorites', JSON.stringify([mockHero]));
    renderTestComponent();
    const button = screen.getByTestId('toggle-favorite');


    expect(screen.getByTestId('favoriteCount').textContent).toBe('1');
    expect(screen.getByTestId('is-favorite').textContent).toBe('true');
    expect(screen.getByTestId('favoritesLenght').textContent).toBe('1');
    expect(localStorage.getItem('favorites')).toBe('[{"id":"1","name":"batman"}]')

    // Act 
    fireEvent.click(button);
    // Assert
    expect(screen.getByTestId('favoriteCount').textContent).toBe('0');
    expect(screen.getByTestId('is-favorite').textContent).toBe('false');
    expect(screen.getByTestId('favoritesLenght').textContent).toBe('0');
    expect(localStorage.getItem('favorites')).toBe('[]');
  });

  test('should call localStroage', () => {
    // Mock
    const localStorageMock = {
      setItem: vi.fn(),
      getItem: vi.fn(),
      clear: vi.fn()
    };

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock
    });

    renderTestComponent();

    localStorageMock.setItem.mockReturnValue(JSON.stringify([]));
    const button = screen.getByTestId('toggle-favorite');
    // Act 
    fireEvent.click(button);

    // Assert
    expect(localStorageMock.setItem).toHaveBeenCalledWith('favorites', '[]');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('favorites', '[{"id":"1","name":"batman"}]');
    expect(localStorageMock.getItem).toHaveBeenCalledWith('favorites');
  });
});