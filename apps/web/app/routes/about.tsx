import {
    ArrowLeft,
    BookOpen,
    Code,
    Database,
    ExternalLink,
    Github,
    Globe,
    Info,
    Shield,
    Star,
    Users,
    Zap
} from 'lucide-react';
import { Navigation } from '../components/navigation';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import type { Route } from './+types/about';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'About - React Router + tRPC + Hono' },
    { name: 'description', content: 'Learn more about our modern full-stack application template' },
  ];
}

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="p-8">
        <div className="container mx-auto max-w-6xl">
          {/* Header Section */}
          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Info className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold tracking-tight">About Our Template</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A bleeding-edge full-stack application template built with the latest technologies
            </p>
          </div>

          {/* Main Content */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column - Features */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <span>Key Features</span>
                  </CardTitle>
                  <CardDescription>
                    What makes this template special
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <h4 className="font-medium flex items-center space-x-2">
                        <Code className="h-4 w-4 text-blue-500" />
                        <span>Frontend</span>
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• React Router v7 with SSR</li>
                        <li>• TypeScript for type safety</li>
                        <li>• Tailwind CSS v4 with CSS variables</li>
                        <li>• shadcn/ui components</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium flex items-center space-x-2">
                        <Database className="h-4 w-4 text-green-500" />
                        <span>Backend</span>
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Hono web framework</li>
                        <li>• tRPC for type-safe APIs</li>
                        <li>• Bun runtime</li>
                        <li>• Full-stack TypeScript</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-green-500" />
                    <span>Architecture Benefits</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="performance" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="performance">Performance</TabsTrigger>
                      <TabsTrigger value="developer">Developer</TabsTrigger>
                      <TabsTrigger value="scalability">Scalability</TabsTrigger>
                    </TabsList>
                    <TabsContent value="performance" className="space-y-4 mt-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <h4 className="font-medium">Fast Rendering</h4>
                          <p className="text-sm text-muted-foreground">
                            Server-side rendering with React Router v7 for optimal performance
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium">Efficient Bundling</h4>
                          <p className="text-sm text-muted-foreground">
                            Vite for lightning-fast development and optimized builds
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="developer" className="space-y-4 mt-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <h4 className="font-medium">Type Safety</h4>
                          <p className="text-sm text-muted-foreground">
                            End-to-end TypeScript with tRPC for bulletproof APIs
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium">Modern Tooling</h4>
                          <p className="text-sm text-muted-foreground">
                            Latest React features, Bun runtime, and modern build tools
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="scalability" className="space-y-4 mt-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <h4 className="font-medium">Monorepo Structure</h4>
                          <p className="text-sm text-muted-foreground">
                            Turborepo for efficient development and deployment
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium">Microservices Ready</h4>
                          <p className="text-sm text-muted-foreground">
                            Hono and tRPC make it easy to scale and split services
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Stats & Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span>Quick Stats</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">React Version</span>
                      <Badge variant="secondary">19.0.0</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Router Version</span>
                      <Badge variant="secondary">7.3.0</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Runtime</span>
                      <Badge variant="default">Bun</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Build Tool</span>
                      <Badge variant="outline">Vite</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    <span>Get Involved</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" asChild>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      View on GitHub
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="https://reactrouter.com" target="_blank" rel="noopener noreferrer">
                      <BookOpen className="h-4 w-4 mr-2" />
                      React Router Docs
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Alert>
                <Globe className="h-4 w-4" />
                <AlertDescription>
                  This template is designed to be a starting point for modern web applications.
                  Customize it according to your needs!
                </AlertDescription>
              </Alert>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="mt-12 text-center">
            <Separator className="mb-8" />
            <div className="flex gap-4 justify-center">
              <Button variant="outline" asChild>
                <a href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </a>
              </Button>
              <Button asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  Star on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
