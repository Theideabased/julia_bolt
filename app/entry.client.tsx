import { RemixBrowser } from '@remix-run/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Could not find root element');
}

// For static builds, always use createRoot (client-side rendering)
const root = createRoot(container);
root.render(
  <StrictMode>
    <RemixBrowser />
  </StrictMode>
);
