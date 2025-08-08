/** @type {import('@remix-run/dev').AppConfig} */
export default {
  // Only ignore dotfiles in routes (default)
  ignoredRouteFiles: [
    "**/.*",
    // Ignore all API route files for static/SPA deployment
    "**/api**.ts",
    "**/api**.tsx",
  ],
  // Always produce server bundle; Vercel will serve static client only
  serverBuildPath: "build/server/index.js",
  publicPath: "/build/",
  future: {
    v3_fetcherPersist: true,
    v3_relativeSplatPath: true,
    v3_throwAbortReason: true,
    v3_lazyRouteDiscovery: true,
    v3_singleFetch: true,
  },
};
