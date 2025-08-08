import { RemixBrowser } from '@remix-run/react';
import { startTransition } from 'react';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root')!;

startTransition(() => {
  createRoot(container).render(<RemixBrowser />);
});
