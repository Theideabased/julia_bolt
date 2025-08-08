import { RemixBrowser } from '@remix-run/react';
import { startTransition } from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';

const container = document.getElementById('root')!;

if (container.innerHTML.trim() === '') {
  // SPA mode - no server-rendered content
  startTransition(() => {
    createRoot(container).render(<RemixBrowser />);
  });
} else {
  // SSR mode - hydrate existing content
  startTransition(() => {
    hydrateRoot(container, <RemixBrowser />);
  });
}
