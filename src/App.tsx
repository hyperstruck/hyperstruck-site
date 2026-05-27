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

import { HelmetProvider } from 'react-helmet-async';

import AppLayout from './components/AppLayout';
import StaticSearchDialog from './components/docs/StaticSearchDialog';
import AboutPage from './pages/AboutPage';
import BlogPageRoute from './pages/BlogPage';
import HomePage from './pages/HomePage';
import DocsPageRoute from './pages/DocsPage';
import PricingPage from './pages/PricingPage';
import SignupPage from './pages/SignupPage';
import UseCasesPage from './pages/UseCasesPage';
import { BLOG_HOME_URL } from './lib/blogLayout';
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
      ['Credentials API', '/docs/credentials-api'],
      ['Agents API', '/docs/agents-api'],
      ['Plans API', '/docs/plans-api'],
      ['Learnings API', '/docs/learnings-api'],
      ['Reasoning', '/docs/reasoning'],
      ['Learning', '/docs/learning'],
      ['Usage API', '/docs/usage-api'],
      ['Framework integrations', '/docs/integrations'],
      ['Claude Code and Cursor', '/docs/claude-skills'],
      ['Security', '/docs/security'],
    ],
    source: '/docs-search.json',
  },
} as ComponentProps<typeof RootProvider>['search'];

const blogSearch = {
  enabled: true,
  SearchDialog: StaticSearchDialog,
  options: {
    links: [['Blog home', BLOG_HOME_URL]],
    source: '/blog-search.json',
  },
} as ComponentProps<typeof RootProvider>['search'];

function RootRouteLayout() {
  const { pathname } = useLocation();
  const search = pathname.startsWith('/blog') ? blogSearch : docsSearch;

  return (
    <RootProvider
      search={search}
      theme={{
        attribute: 'class',
        defaultTheme: 'light',
        enableSystem: false,
        forcedTheme: 'light',
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
        <Route path="/use-cases" element={<UseCasesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>
      <Route path="/blog/*" element={<BlogPageRoute />} />
      <Route path="/docs/*" element={<DocsPageRoute />} />
    </Route>,
  ),
);

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  );
}
