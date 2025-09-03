import { Link } from 'react-router';
import { useAuth } from '../hooks/use-auth';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Users, 
  Settings, 
  LogOut,
  User,
  CheckCircle
} from 'lucide-react';

export default function HomePage() {
  const { user, isAuthenticated, isLoadingUser, logout } = useAuth();

  if (isLoadingUser) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">Auth Demo</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">{user?.username}</span>
                    <Badge variant={user?.role === 'admin' ? 'default' : 'secondary'}>
                      {user?.role}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm" onClick={logout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </Button>
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/login">Entrar</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link to="/register">Registrar</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {isAuthenticated ? (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <h2 className="text-4xl font-bold tracking-tight">
                  Bem-vindo, {user?.username}!
                </h2>
              </div>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Você está logado com sucesso! Agora você pode acessar todas as funcionalidades da aplicação.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-blue-500" />
                    <span>Perfil</span>
                  </CardTitle>
                  <CardDescription>
                    Gerencie suas informações pessoais e configurações da conta
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link to="/settings">
                      Gerenciar Perfil
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-green-500" />
                    <span>Segurança</span>
                  </CardTitle>
                  <CardDescription>
                    Alterar senha e configurar opções de segurança da conta
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/settings">
                      Configurações
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {user?.role === 'admin' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-purple-500" />
                      <span>Admin</span>
                    </CardTitle>
                    <CardDescription>
                      Acesso às funcionalidades administrativas da aplicação
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="default" className="w-full justify-center">
                      Acesso Admin
                    </Badge>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Shield className="h-8 w-8 text-primary" />
                <h2 className="text-4xl font-bold tracking-tight">
                  Autenticação JWT Completa
                </h2>
              </div>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Demonstração de um sistema de autenticação JWT completo usando React Router, tRPC e Hono.
                Registre-se ou faça login para começar.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <span>Rápido</span>
                  </CardTitle>
                  <CardDescription>
                    Autenticação rápida e segura com JWT tokens
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-green-500" />
                    <span>Seguro</span>
                  </CardTitle>
                  <CardDescription>
                    Tokens JWT com expiração e validação robusta
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    <span>Flexível</span>
                  </CardTitle>
                  <CardDescription>
                    Sistema de roles e permissões configurável
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* CTA Section */}
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-semibold">Comece Agora</h3>
              <p className="text-muted-foreground">
                Crie uma conta ou faça login para experimentar todas as funcionalidades
              </p>
              <div className="flex items-center justify-center space-x-4">
                <Button size="lg" asChild>
                  <Link to="/register">
                    Criar Conta
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/login">
                    Fazer Login
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
