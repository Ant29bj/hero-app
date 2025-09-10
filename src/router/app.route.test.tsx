import { beforeEach, describe, expect, test, vi } from "vitest";
import { appRouter } from "./app.route";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, Outlet, RouterProvider, useParams } from "react-router";


vi.mock('@/heroes/layouts/HeroesLayout', () => ({
  HeoresLayout: () => <div data-testid='hero-layout'><Outlet /></div>
}));

vi.mock('@/heroes/pages/home/HomePage', () => ({
  HomePage: () => <div data-testid='home-page'></div>
}));

vi.mock('@/heroes/pages/hero/HeroPage', () => ({
  default: () => {
    const { idSlug = '' } = useParams();
    return (
      <div data-testid='hero-page'>
        Hero Page {idSlug}
      </div>
    );
  }
}));

vi.mock('@/heroes/pages/search/SearchPage', () => ({
  default: () => <div data-testid='search'></div>

}));


describe('app.route', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  })

  test('should configure as expected', () => {
    expect(appRouter.routes).toMatchSnapshot();
  });

  test('should render HomePage at root path', () => {
    const mockRouter = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/']
    });

    render(<RouterProvider router={mockRouter} />);

    expect(screen.getByTestId('home-page')).toBeDefined();
  });

  test('should render HeroPage at /hero/:idSlug', () => {
    // Mock 
    const mockRouter = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/hero/superman']
    });
    // Act
    render(<RouterProvider router={mockRouter} />);

    // Assert
    const heroPage = screen.getByTestId('hero-page');

    expect(heroPage).toBeDefined();
    expect(heroPage.textContent).toContain('superman');
  });


  test('should render search page at /search path', async () => {
    const mockRouter = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/search']
    });
    render(<RouterProvider router={mockRouter} />);

    expect(await screen.findByTestId('search')).toBeDefined();
  });


  test('should render search page at /admin path', async () => {
    const mockRouter = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/admin']
    });
    render(<RouterProvider router={mockRouter} />);

    expect(await screen.findByText('Admin Page')).toBeDefined();
  });

  test('should redirect for home page for unknown route', async () => {
    const mockRouter = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/non-existing-page']
    });
    render(<RouterProvider router={mockRouter} />);

    expect(screen.getByTestId('home-page')).toBeDefined();
  });
});