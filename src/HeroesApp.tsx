import { RouterProvider } from "react-router";
import { appRouter } from "./router/app.route";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FavoriteHeroProvider } from "./heroes/context/favorites-hero.context";
export function HeroesApp() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <FavoriteHeroProvider>
          <RouterProvider router={appRouter} />
          <ReactQueryDevtools />
        </FavoriteHeroProvider>
      </QueryClientProvider>
    </>
  );
}