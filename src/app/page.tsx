// Root redirect — next-intl middleware handles locale-based redirection.
// This file exists to satisfy Next.js App Router conventions.
// Users arriving at "/" are redirected to "/es" or "/en" by the middleware.
export default function RootPage() {
  return null;
}
