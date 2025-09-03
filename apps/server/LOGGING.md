# Sistema de Logging Profissional

Este documento descreve o sistema de logging implementado no servidor, que utiliza Winston para logging estruturado e profissional.

## 🏗️ Arquitetura

### Componentes Principais

- **Winston Logger**: Sistema de logging principal
- **Daily Rotate File**: Rotação automática de arquivos de log
- **Console Transport**: Output colorido para desenvolvimento
- **File Transport**: Logs estruturados em arquivos
- **Middleware de Logging**: Logging automático de requisições HTTP

### Estrutura de Arquivos

```
logs/
├── application-2024-01-15.log    # Logs gerais da aplicação
├── error-2024-01-15.log          # Logs de erro
├── http-2024-01-15.log           # Logs de requisições HTTP
└── archive/                       # Logs arquivados
    ├── application-2024-01-08.log
    └── error-2024-01-08.log
```

## 📊 Níveis de Log

### Hierarquia (do mais crítico ao menos crítico)

1. **error** (0) - Erros críticos que afetam a aplicação
2. **warn** (1) - Avisos sobre situações que podem ser problemáticas
3. **info** (2) - Informações gerais sobre o funcionamento
4. **http** (3) - Requisições e respostas HTTP
5. **debug** (4) - Informações detalhadas para desenvolvimento

### Cores no Console

- 🔴 **error**: Vermelho
- 🟡 **warn**: Amarelo
- 🟢 **info**: Verde
- 🟣 **http**: Magenta
- ⚪ **debug**: Branco

## 🚀 Como Usar

### Importação Básica

```typescript
import { log } from "./lib/logger";

// Logs básicos
log.info("Servidor iniciado");
log.warn("Configuração não encontrada");
log.error("Erro crítico", error);
log.debug("Informação de debug");
log.http("Requisição HTTP processada");
```

### Logging com Metadados

```typescript
log.info("Usuário autenticado", {
  userId: "123",
  email: "user@example.com",
  ip: "192.168.1.1",
  timestamp: new Date().toISOString(),
});
```

### Logging de Erros

```typescript
try {
  // código que pode falhar
} catch (error) {
  log.error("Falha na operação", error, {
    operation: "user_update",
    userId: "123",
    additionalContext: "profile_update",
  });
}
```

## 🔧 Configuração

### Variáveis de Ambiente

```bash
# Nível de log (padrão: info)
LOG_LEVEL=debug

# Ambiente (afeta output do console)
NODE_ENV=development

# Porta do servidor
PORT=3001

# Chave secreta JWT
JWT_SECRET=your-secret-key
```

### Configuração por Ambiente

#### Desenvolvimento

- Console: Todos os níveis (debug+)
- Arquivos: Todos os níveis
- Cores: Ativadas
- Rotação: Diária

#### Produção

- Console: Apenas info e acima
- Arquivos: Todos os níveis
- Cores: Desativadas
- Rotação: Diária com compressão

## 📁 Rotação de Arquivos

### Configuração de Rotação

- **Tamanho máximo**: 20MB por arquivo
- **Retenção**: 14 dias para logs gerais
- **Retenção**: 30 dias para logs de erro
- **Retenção**: 7 dias para logs HTTP
- **Compressão**: Automática (gzip)

### Nomenclatura

- `application-YYYY-MM-DD.log` - Logs gerais
- `error-YYYY-MM-DD.log` - Logs de erro
- `http-YYYY-MM-DD.log` - Logs HTTP

## 🛠️ Scripts de Gerenciamento

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

### Uso Direto do Script

```bash
# Ver ajuda
./scripts/manage-logs.sh help

# Status dos logs
./scripts/manage-logs.sh status

# Logs em tempo real
./scripts/manage-logs.sh tail

# Filtrar erros
./scripts/manage-logs.sh errors | grep "ERROR"
```

## 🔍 Exemplos de Logs

### Log de Requisição HTTP

```json
{
  "timestamp": "2024-01-15 10:30:45:123",
  "level": "http",
  "message": "Incoming POST request",
  "method": "POST",
  "url": "/trpc/auth.login",
  "userAgent": "Mozilla/5.0...",
  "ip": "192.168.1.100"
}
```

### Log de Autenticação

```json
{
  "timestamp": "2024-01-15 10:30:46:456",
  "level": "info",
  "message": "User logged in successfully",
  "userId": "123",
  "email": "user@example.com",
  "username": "john_doe",
  "role": "user",
  "ip": "192.168.1.100"
}
```

### Log de Erro

```json
{
  "timestamp": "2024-01-15 10:30:47:789",
  "level": "error",
  "message": "Database connection failed",
  "stack": "Error: connect ECONNREFUSED...",
  "errorCode": "ECONNREFUSED",
  "operation": "database_connect"
}
```

## 🎯 Casos de Uso

### 1. Monitoramento de Performance

```typescript
const startTime = Date.now();
// ... operação ...
const duration = Date.now() - startTime;

log.info("Operação concluída", {
  operation: "user_creation",
  duration: `${duration}ms`,
  success: true,
});
```

### 2. Auditoria de Segurança

```typescript
log.warn("Tentativa de acesso não autorizado", {
  ip: request.ip,
  userAgent: request.headers["user-agent"],
  path: request.path,
  timestamp: new Date().toISOString(),
});
```

### 3. Debugging de Problemas

```typescript
log.debug("Processando requisição", {
  method: request.method,
  path: request.path,
  headers: request.headers,
  body: request.body,
});
```

## 🔒 Segurança

### Informações Sensíveis

⚠️ **NUNCA** logue:

- Senhas (mesmo hasheadas)
- Tokens JWT
- Dados pessoais sensíveis
- Chaves de API

### Informações Seguras para Log

✅ **PODE** logue:

- IDs de usuário
- Endereços IP
- Timestamps
- Métodos HTTP
- Códigos de status
- Duração de operações

## 📈 Monitoramento e Alertas

### Logs Críticos

Configure alertas para:

- `level: error` - Erros críticos
- `level: warn` - Múltiplos warnings
- Falhas de autenticação
- Timeouts de operações

### Métricas Úteis

- Taxa de erro por endpoint
- Tempo de resposta médio
- Usuários ativos por período
- Tentativas de login falhadas

## 🚨 Troubleshooting

### Problemas Comuns

#### 1. Logs não aparecem

- Verifique `LOG_LEVEL`
- Confirme permissões do diretório `logs/`
- Verifique se o servidor está rodando

#### 2. Arquivos de log muito grandes

- Execute `bun run logs:clean`
- Verifique configuração de rotação
- Ajuste `maxSize` se necessário

#### 3. Performance degradada

- Reduza `LOG_LEVEL` para `warn` em produção
- Verifique se logs estão sendo escritos em disco rápido
- Monitore uso de I/O

### Comandos de Diagnóstico

```bash
# Verificar espaço em disco
df -h

# Verificar tamanho dos logs
du -sh logs/*

# Verificar permissões
ls -la logs/

# Verificar processos de log
ps aux | grep winston
```

## 🔮 Futuras Melhorias

### Funcionalidades Planejadas

- [ ] Integração com ELK Stack
- [ ] Logs estruturados em JSON
- [ ] Correlação de requisições (request ID)
- [ ] Métricas automáticas
- [ ] Alertas em tempo real
- [ ] Dashboard de logs
- [ ] Integração com sistemas de monitoramento

### Integrações Possíveis

- **Datadog**: Para monitoramento em tempo real
- **Sentry**: Para rastreamento de erros
- **Loggly**: Para análise de logs
- **CloudWatch**: Para logs na AWS
- **Stackdriver**: Para logs no Google Cloud

## 📚 Referências

- [Winston Documentation](https://github.com/winstonjs/winston)
- [Winston Daily Rotate File](https://github.com/winstonjs/winston-daily-rotate-file)
- [Logging Best Practices](https://12factor.net/logs)
- [Structured Logging](https://www.structured-logging.org/)
