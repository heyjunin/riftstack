import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from 'react-router';

import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import type { Route } from './+types/root';
import stylesheet from './app.css?url';
import { Alert, AlertDescription } from './components/ui/alert';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { TRPCProvider } from './lib/trpc-provider';

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,opsz,wght@0,400..900;1,400..900&family=Playwrite+US+Modern:wght@100..400&display=swap',
  },
  { rel: 'stylesheet', href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <TRPCProvider>
      <Outlet />
    </TRPCProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
          <CardTitle className="text-3xl">{message}</CardTitle>
          <CardDescription className="text-lg">
            {details}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {stack && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <details className="mt-2">
                  <summary className="cursor-pointer font-medium">View Stack Trace</summary>
                  <pre className="mt-2 text-sm bg-muted p-3 rounded-md overflow-x-auto">
                    <code>{stack}</code>
                  </pre>
                </details>
              </AlertDescription>
            </Alert>
          )}
          
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => window.history.back()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Go Back
            </Button>
            <Button onClick={() => window.location.href = '/'}>
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
