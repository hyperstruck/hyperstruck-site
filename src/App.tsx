import { CssBaseline, ThemeProvider } from '@mui/material';
import type { ComponentProps } from 'react';
import { useEffect } from 'react';
import { RootProvider } from 'fumadocs-ui/provider/react-router';
import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useLocation,
} from 'react-router-dom';

import AppLayout from './components/AppLayout';
import StaticSearchDialog from './components/docs/StaticSearchDialog';
import HomePage from './pages/HomePage';
import DocsPageRoute from './pages/DocsPage';
import PricingPage from './pages/PricingPage';
import SignupPage from './pages/SignupPage';
import appTheme from './theme/appTheme';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

const docsSearch = {
  enabled: true,
  SearchDialog: StaticSearchDialog,
  options: {
    links: [
      ['Docs home', '/docs'],
      ['Quickstart', '/docs/quickstart'],
      ['Reasoning', '/docs/reasoning'],
      ['Learning', '/docs/learning'],
    ],
    source: '/docs-search.json',
  },
} as ComponentProps<typeof RootProvider>['search'];

function RootRouteLayout() {
  return (
    <RootProvider
      search={docsSearch}
      theme={{
        attribute: 'class',
        defaultTheme: 'dark',
        enableSystem: false,
        forcedTheme: 'dark',
      }}
    >
      <ScrollToTop />
      <Outlet />
    </RootProvider>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootRouteLayout />}>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>
      <Route path="/docs/*" element={<DocsPageRoute />} />
    </Route>,
  ),
);

export default function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
