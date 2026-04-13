import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function getDocsLayoutOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'Hyperstruck Docs',
      url: '/docs',
    },
    links: [
      {
        type: 'main',
        text: 'Home',
        url: '/',
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
