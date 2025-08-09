import { RemixBrowser } from '@remix-run/react';
import { startTransition, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root')!;

// Ensure DOM is fully loaded before attempting to render
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

function initializeApp() {
  // For SPA mode, we need to render directly without expecting server-rendered content
  const renderApp = () => (
    <StrictMode>
      <RemixBrowser />
    </StrictMode>
  );

  // Use startTransition for better performance
  startTransition(() => {
    createRoot(container).render(renderApp());
  });
}
