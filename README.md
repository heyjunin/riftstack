# React Router + tRPC + Hono + Bun Template

Template completo para aplicações full-stack com React Router v7, tRPC, Hono e Bun.

## 🚀 Tecnologias

### Backend (Hono + tRPC)

- ✅ Autenticação JWT completa
- ✅ Sistema de roles (user/admin)
- ✅ Validação com Zod
- ✅ **Sistema de logging profissional com Winston**
- ✅ **Middleware CORS configurado**
- ✅ Rotação automática de logs
- ✅ Logs estruturados e coloridos

### Frontend (React Router v7)

- ✅ Páginas de login e registro
- ✅ Gerenciamento de estado de autenticação
- ✅ UI moderna com shadcn/ui
- ✅ Tailwind CSS v4
- ✅ Integração tRPC completa

### Infraestrutura

- ✅ Monorepo com Turbo
- ✅ Bun como runtime
- ✅ TypeScript em todo o projeto
- ✅ Biome para linting/formatting
- ✅ Testes com Vitest e Playwright

## 📁 Estrutura do Projeto

```
├── apps/
│   ├── server/                 # Backend Hono + tRPC
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   └── logger.ts   # Sistema de logging Winston
│   │   │   ├── middleware/
│   │   │   │   ├── auth.ts     # Middleware de autenticação
│   │   │   │   └── cors.ts     # Middleware CORS
│   │   │   ├── services/
│   │   │   │   └── auth-service.ts
│   │   │   └── repositories/
│   │   │       └── mock-user-repository.ts
│   │   ├── logs/               # Arquivos de log (gerados automaticamente)
│   │   ├── scripts/
│   │   │   └── manage-logs.sh  # Scripts para gerenciar logs
│   │   └── LOGGING.md          # Documentação completa do sistema de logging
│   └── web/                    # Frontend React Router
└── package.json
```

## 🔧 Pré-requisitos

- [Bun](https://bun.sh/) instalado
- Node.js 18+ (para compatibilidade)

## 🚀 1. Instalar dependências

```bash
bun install
```

## 🚀 2. Executar em desenvolvimento

```bash
# Inicia backend e frontend simultaneamente
bun run dev

# Ou individualmente:
# Backend
cd apps/server && bun run dev

# Frontend
cd apps/web && bun run dev
```

## 🚀 3. Acessar a aplicação

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001

## 🔐 Credenciais de Teste

### Admin

- **Email**: admin@example.com
- **Senha**: admin123
- **Role**: admin

### Usuário

- **Email**: user@example.com
- **Senha**: user123
- **Role**: user

## 📱 Rotas Disponíveis

### Públicas

- `/` - Página inicial
- `/login` - Página de login
- `/register` - Página de registro

### Autenticadas

- `/settings` - Configurações do usuário (requer login)

## 🔧 Endpoints tRPC

### Autenticação

- `auth.register` - Registro de usuário
- `auth.login` - Login de usuário
- `auth.logout` - Logout de usuário
- `auth.me` - Informações do usuário atual

### Usuário

- `user.profile` - Perfil do usuário
- `user.updateProfile` - Atualizar perfil
- `user.changePassword` - Alterar senha

### Admin

- `admin.users` - Listar usuários (apenas admin)

## 📊 Sistema de Logging

### Comandos Disponíveis

```bash
# Ver status dos logs
bun run logs:status

# Acompanhar logs em tempo real
bun run logs:tail

# Ver apenas logs de erro
bun run logs:errors

# Ver apenas logs HTTP
bun run logs:http

# Limpar logs antigos
bun run logs:clean

# Arquivar logs antigos
bun run logs:archive
```

### Estrutura de Logs

- **application-YYYY-MM-DD.log** - Logs gerais da aplicação
- **error-YYYY-MM-DD.log** - Logs de erro
- **http-YYYY-MM-DD.log** - Logs de requisições HTTP
- **archive/** - Logs arquivados automaticamente

### Níveis de Log

- 🔴 **error** - Erros críticos
- 🟡 **warn** - Avisos
- 🟢 **info** - Informações gerais
- 🟣 **http** - Requisições HTTP
- ⚪ **debug** - Informações de debug

## 🌐 Configuração CORS

O servidor está configurado com CORS para permitir requisições do frontend:

- **Origem**: http://localhost:3000 (desenvolvimento)
- **Credenciais**: Habilitadas para cookies de autenticação
- **Métodos**: GET, POST, PUT, DELETE, PATCH, OPTIONS
- **Headers**: Content-Type, Authorization, etc.

## 🎯 Próximos Passos para Produção

### 1. Banco de Dados Real

- Substituir `MockUserRepository` por implementação real
- Implementar `UserRepository` interface
- Adicionar migrations e seeders

### 2. Segurança

- Configurar `JWT_SECRET` em variáveis de ambiente
- Implementar refresh tokens
- Adicionar rate limiting
- Configurar CORS para domínios de produção

### 3. Funcionalidades

- Recuperação de senha
- Verificação de email
- Autenticação 2FA
- Auditoria de ações

### 4. Monitoramento

- Integrar com sistemas de monitoramento (Datadog, Sentry)
- Configurar alertas para logs críticos
- Dashboard de métricas em tempo real

## 🧪 Testes

```bash
# Testes do backend
cd apps/server && bun test

# Testes do frontend
cd apps/web && bun test

# Testes E2E
cd apps/web && bun run test:e2e
```

## 📝 Scripts Disponíveis

### Backend (apps/server)

```bash
bun run dev          # Desenvolvimento com hot reload
bun run lint         # Linting com Biome
bun run test         # Testes com Bun
bun run types        # Verificação de tipos TypeScript
bun run logs:status  # Status dos logs
bun run logs:tail    # Logs em tempo real
bun run logs:errors  # Ver logs de erro
bun run logs:http    # Ver logs HTTP
bun run logs:clean   # Limpar logs antigos
bun run logs:archive # Arquivar logs antigos
```

### Frontend (apps/web)

```bash
bun run dev          # Desenvolvimento com Vite
bun run build        # Build de produção
bun run preview      # Preview do build
bun run lint         # Linting com Biome
bun run test         # Testes com Vitest
bun run test:e2e     # Testes E2E com Playwright
```

## 🔍 Debugging

### Backend

- Logs aparecem no console
- Logs estruturados em arquivos
- Endpoints tRPC em `/trpc/*`
- Middleware de autenticação ativo
- Middleware CORS configurado

### Frontend

- React DevTools disponível
- tRPC DevTools integrado
- Hot reload ativo
- Logs de erro no console

## 📚 Documentação Adicional

- [Sistema de Logging](./apps/server/LOGGING.md) - Documentação completa do Winston
- [Padrões de Desenvolvimento](./.cursor/rules/) - Regras do Cursor para o projeto

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
