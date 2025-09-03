import {
    AlertCircle,
    ArrowLeft,
    Bell,
    CheckCircle,
    Database,
    Palette,
    RotateCcw,
    Save,
    Settings,
    Shield
} from 'lucide-react';
import { Navigation } from '../components/navigation';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import { Switch } from '../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import type { Route } from './+types/settings';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Settings - React Router + tRPC + Hono' },
    { name: 'description', content: 'Configure your application settings' },
  ];
}

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="p-8">
        <div className="container mx-auto max-w-4xl">
          {/* Header Section */}
          <div className="text-center space-y-4 mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Settings className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Customize your application preferences
            </p>
          </div>

          {/* Settings Tabs */}
          <Tabs defaultValue="appearance" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            {/* Appearance Tab */}
            <TabsContent value="appearance" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="h-5 w-5 text-purple-500" />
                    <span>Theme & Colors</span>
                  </CardTitle>
                  <CardDescription>
                    Customize the look and feel of your application
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="theme-mode">Theme Mode</Label>
                      <Select defaultValue="system">
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="color-scheme">Color Scheme</Label>
                      <Select defaultValue="default">
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Select color scheme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="blue">Blue</SelectItem>
                          <SelectItem value="green">Green</SelectItem>
                          <SelectItem value="purple">Purple</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="animations">Enable Animations</Label>
                      <Switch id="animations" defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5 text-blue-500" />
                    <span>Notification Preferences</span>
                  </CardTitle>
                  <CardDescription>
                    Control how and when you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <Switch id="email-notifications" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <Switch id="push-notifications" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="browser-notifications">Browser Notifications</Label>
                      <Switch id="browser-notifications" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notification-email">Notification Email</Label>
                      <Input 
                        id="notification-email" 
                        type="email" 
                        placeholder="your@email.com"
                        defaultValue="user@example.com"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-green-500" />
                    <span>Security Settings</span>
                  </CardTitle>
                  <CardDescription>
                    Manage your account security and privacy
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                      <Switch id="two-factor" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                      <Input 
                        id="session-timeout" 
                        type="number" 
                        className="w-24"
                        defaultValue="30"
                        min="5"
                        max="480"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-notifications">Login Notifications</Label>
                      <Switch id="login-notifications" defaultChecked />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Password</h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Advanced Tab */}
            <TabsContent value="advanced" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="h-5 w-5 text-orange-500" />
                    <span>Advanced Configuration</span>
                  </CardTitle>
                  <CardDescription>
                    Advanced settings for power users
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="debug-mode">Debug Mode</Label>
                      <Switch id="debug-mode" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="analytics">Analytics Collection</Label>
                      <Switch id="analytics" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="telemetry">Telemetry Data</Label>
                      <Switch id="telemetry" defaultChecked />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="api-endpoint">Custom API Endpoint</Label>
                      <Input 
                        id="api-endpoint" 
                        placeholder="https://api.example.com"
                        defaultValue="http://localhost:3000"
                      />
                    </div>
                  </div>

                  <Separator />

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Advanced settings may affect application stability. 
                      Only modify these if you know what you're doing.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4 justify-center">
            <Button variant="outline" asChild>
              <a href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </a>
            </Button>
            <Button variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset to Defaults
            </Button>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>

          {/* Success Message */}
          <div className="mt-6 text-center">
            <Alert className="max-w-md mx-auto">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertDescription>
                Your settings have been saved successfully!
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
}
