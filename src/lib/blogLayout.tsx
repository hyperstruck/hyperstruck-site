import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export const BLOG_HOME_URL = '/blog';

export function getBlogLayoutOptions(): BaseLayoutProps {
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
        text: 'Docs',
        url: '/docs',
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
