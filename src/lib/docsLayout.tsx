import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

import { BLOG_HOME_URL } from './blogLayout';

export function getDocsLayoutOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'Hyperstruck',
      url: '/',
    },
    links: [
      {
        type: 'main',
        text: 'Home',
        url: '/',
      },
      {
        type: 'main',
        text: 'Blog',
        url: BLOG_HOME_URL,
      },
      {
        type: 'main',
        text: 'Pricing',
        url: '/pricing',
      },
      {
        type: 'button',
        text: 'Request access',
        url: '/signup',
      },
      {
        type: 'button',
        text: 'OpenAPI Spec (coming soon)',
        url: 'https://api.core.hyperstruck.com/openapi.json',
      }
    ],
    searchToggle: {
      enabled: true,
      full: {
        className: 'hidden md:flex',
      },
    },
    themeSwitch: {
      enabled: false,
    },
  };
}
