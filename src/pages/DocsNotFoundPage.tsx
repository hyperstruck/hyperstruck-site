import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';

export default function DocsNotFoundPage() {
  useEffect(() => {
    document.title = 'Docs Not Found | Hyperstruck Docs';

    const metaDescription = document.querySelector('meta[name="description"]');

    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'The requested Hyperstruck documentation page could not be found.',
      );
    }
  }, []);

  return (
    <DocsPage tableOfContent={{ enabled: false }}>
      <DocsTitle>Page not found</DocsTitle>
      <DocsDescription>
        The document you requested does not exist yet.
      </DocsDescription>
      <DocsBody>
        <p>
          Head back to the docs index to browse the starter content, or return to the
          main Hyperstruck site.
        </p>
        <p>
          <RouterLink to="/docs">Go to docs home</RouterLink>
          {'  '}
          <RouterLink to="/">Back to hyperstruck.com</RouterLink>
        </p>
      </DocsBody>
    </DocsPage>
  );
}
