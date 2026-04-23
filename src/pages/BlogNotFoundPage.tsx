import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';

export default function BlogNotFoundPage() {
  useEffect(() => {
    document.title = 'Blog Not Found | Hyperstruck Blog';

    const metaDescription = document.querySelector('meta[name="description"]');

    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'The requested Hyperstruck blog page could not be found.',
      );
    }
  }, []);

  return (
    <DocsPage tableOfContent={{ enabled: false }}>
      <DocsTitle>Post not found</DocsTitle>
      <DocsDescription>The blog post you requested does not exist yet.</DocsDescription>
      <DocsBody>
        <p>Head back to the blog index to browse published posts, or return to the main site.</p>
        <p>
          <RouterLink to="/blog">Go to blog home</RouterLink>
          {'  '}
          <RouterLink to="/">Back to hyperstruck.com</RouterLink>
        </p>
      </DocsBody>
    </DocsPage>
  );
}
