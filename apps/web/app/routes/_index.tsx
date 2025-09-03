import { Navigation } from '../components/navigation';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { client } from '../server';
import type { Route } from './+types/_index';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export async function loader() {
  return {
    data: await client.get.query(),
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="p-8">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col items-center space-y-8">
            {/* Header Section */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">
                Welcome to React Router + tRPC + Hono
              </h1>
              <p className="text-xl text-muted-foreground">
                A modern full-stack application template
              </p>
            </div>

            <Separator className="w-full max-w-md" />

            {/* Main Content Card */}
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <CardTitle>Application Status</CardTitle>
                <CardDescription>
                  Current system information and status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">ID:</span>
                  <Badge variant="secondary" className="font-mono">
                    {loaderData.data.id}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Status:</span>
                  <Badge variant="default" className="font-mono">
                    {loaderData.data.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button variant="outline">
                View Details
              </Button>
              <Button>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
