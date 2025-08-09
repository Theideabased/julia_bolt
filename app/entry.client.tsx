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
  try {
    // For client-side rendering, we need to render directly
    const renderApp = () => (
      <StrictMode>
        <RemixBrowser />
      </StrictMode>
    );

    // Use createRoot instead of hydrateRoot for static deployment
    startTransition(() => {
      createRoot(container).render(renderApp());
    });
  } catch (error) {
    console.error('Failed to initialize app:', error);
    // Fallback rendering
    const root = createRoot(container);
    root.render(
      <div style={{ padding: '20px', color: 'red' }}>
        <h1>Loading Error</h1>
        <p>There was an error loading the application. Please refresh the page.</p>
        <pre>{String(error)}</pre>
      </div>
    );
  }
}
