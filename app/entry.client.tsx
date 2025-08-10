import { RemixBrowser } from '@remix-run/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Ensure DOM is ready
function initializeApp() {
  const container = document.getElementById('root');
  
  if (!container) {
    throw new Error('Root element not found');
  }

  // Clear container and create root
  container.innerHTML = '';
  
  try {
    const root = createRoot(container);
    
    root.render(
      <StrictMode>
        <RemixBrowser />
      </StrictMode>
    );
  } catch (error) {
    console.error('Failed to initialize app:', error);
    // Fallback: show basic error message
    container.innerHTML = '<div style="padding: 20px; text-align: center;">Loading application...</div>';
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  // DOM already loaded
  initializeApp();
}
