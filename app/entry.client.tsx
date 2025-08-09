import { RemixBrowser } from '@remix-run/react';
import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Could not find root element');
}

// Check if the app is server-rendered or needs client-side rendering
const isServerRendered = container.innerHTML.trim() !== '';

if (isServerRendered) {
  // Hydrate server-rendered content
  hydrateRoot(
    container,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>
  );
} else {
  // Render client-side (for static builds)
  import('react-dom/client').then(({ createRoot }) => {
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <RemixBrowser />
      </StrictMode>
    );
  });
}
