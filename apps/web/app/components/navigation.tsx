import { Code, Database, Github, Home, Info, Settings } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";

export function Navigation() {
  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <Code className="h-6 w-6" />
            <span className="font-bold text-lg">React Router + tRPC + Hono</span>
            <Badge variant="secondary" className="ml-2">v1.0.0</Badge>
          </div>

          {/* Navigation Menu */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/about">
                  <Info className="h-4 w-4 mr-2" />
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Database className="h-4 w-4 mr-2" />
                  Features
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px]">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <h4 className="font-medium">Frontend</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>React Router v7</li>
                          <li>TypeScript</li>
                          <li>Tailwind CSS</li>
                          <li>shadcn/ui</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Backend</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>Hono</li>
                          <li>tRPC</li>
                          <li>Bun Runtime</li>
                          <li>Type Safety</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
            <Button size="sm">Get Started</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
