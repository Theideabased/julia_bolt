import { RemixBrowser } from '@remix-run/react';
import { startTransition, StrictMode } from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';

const container = document.getElementById('root')!;

// For SPA mode, we need to render directly without expecting server-rendered content
function renderApp() {
  return (
    <StrictMode>
      <RemixBrowser />
    </StrictMode>
  );
}

// Always use createRoot for Vercel static deployment
// This avoids hydration mismatches and router context issues
startTransition(() => {
  createRoot(container).render(renderApp());
});
