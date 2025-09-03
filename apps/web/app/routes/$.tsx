import { AlertTriangle, ArrowLeft, Home } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import type { Route } from './+types/$';

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  
  // Handle Chrome DevTools specific routes
  if (url.pathname === '/.well-known/appspecific/com.chrome.devtools.json') {
    return new Response(JSON.stringify({
      name: 'React Router + tRPC + Hono App',
      version: '1.0.0',
      description: 'A full-stack application with React Router, tRPC, and Hono'
    }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // For other unmatched routes, throw a 404
  throw new Response('Not Found', { status: 404 });
}

export default function SplatRoute() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
          <CardTitle className="text-3xl">404</CardTitle>
          <CardDescription className="text-lg">
            Page not found
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
            <Button className="flex-1">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
