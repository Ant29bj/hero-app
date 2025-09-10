import { createHashRouter, Navigate } from "react-router";
import { lazy } from "react";

import { AdminLayout } from "@/admin/layout/AdminLayout";
import { HeoresLayout } from "@/heroes/layouts/HeroesLayout";
import { HomePage } from "@/heroes/pages/home/HomePage";
import HeroPage from "@/heroes/pages/hero/HeroPage";


const SearchPage = lazy(() => import('@/heroes/pages/search/SearchPage'));
const AdminPage = lazy(() => import('@/admin/pages/AdminPage'))

export const appRouter = createHashRouter([
  {
    path: '/',
    element: <HeoresLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/hero/:idSlug',
        element: <HeroPage />
      },
      {
        path: '/search',
        element: <SearchPage />
      },
    ]
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminPage />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to='/' />
  }
]);