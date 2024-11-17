import { createBrowserRouter } from "react-router-dom";
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import NotFoundPage from '../pages/NotFoundPage';
import Layout from "../layouts/Layout";
import ProfilePage from "../pages/ProfilePage";
import SearchPage from "../pages/SearchPage";
import InboxPage from "../pages/InboxPage";
import NotifcationsPage from "../pages/NotifcationsPage";
import FilesPage from "../pages/FilesPage";
import SettingsPage from "../pages/SettingsPage";

export const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/login',
          element: <LoginPage />,
        },
        {
          path: '/register',
          element: <RegisterPage />,
        },
        {
          path: '/profile',
          element: <ProfilePage />,
        },
        {
          path: '/inbox',
          element: <InboxPage />,
        },
        {
          path: '/files',
          element: <FilesPage />,
        },
        {
          path: '/settings',
          element: <SettingsPage />,
        },
        {
          path: '/search',
          element: <SearchPage />,
        },
        {
          path: '/notifications',
          element: <NotifcationsPage />,
        },
        {
          path: '*',
          element: <NotFoundPage />,
        },
      ],
    },
  ],
  {
    future: {
      v7_skipActionErrorRevalidation: true,
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
    },
  }
);
