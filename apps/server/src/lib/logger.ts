import * as path from "path";
import * as winston from "winston";
const DailyRotateFile = require("winston-daily-rotate-file");

// Níveis de log personalizados
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Cores para diferentes níveis
const logColors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

// Adicionar cores ao Winston
winston.addColors(logColors);

// Formato personalizado para logs
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info: any) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

// Formato para arquivos (sem cores)
const fileLogFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Diretório para logs
const logDir = path.join(process.cwd(), "logs");

// Configuração de rotação de arquivos
const dailyRotateFileTransport = new DailyRotateFile({
  filename: path.join(logDir, "application-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d", // Manter logs por 14 dias
  format: fileLogFormat,
});

// Configuração de rotação para erros
const errorRotateFileTransport = new DailyRotateFile({
  filename: path.join(logDir, "error-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "30d", // Manter logs de erro por 30 dias
  level: "error",
  format: fileLogFormat,
});

// Configuração de rotação para HTTP requests
const httpRotateFileTransport = new DailyRotateFile({
  filename: path.join(logDir, "http-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "7d", // Manter logs HTTP por 7 dias
  level: "http",
  format: fileLogFormat,
});

// Logger principal
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  levels: logLevels,
  format: fileLogFormat,
  transports: [
    // Logs de erro separados
    errorRotateFileTransport,
    // Logs HTTP separados
    httpRotateFileTransport,
    // Logs gerais com rotação
    dailyRotateFileTransport,
  ],
  // Não falhar se não conseguir escrever logs
  exitOnError: false,
});

// Adicionar transport para console em desenvolvimento
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: logFormat,
      level: "debug",
    })
  );
}

// Adicionar transport para console em produção (apenas info e acima)
if (process.env.NODE_ENV === "production") {
  logger.add(
    new winston.transports.Console({
      format: logFormat,
      level: "info",
    })
  );
}

// Funções de logging personalizadas
export const log = {
  // Log de erro com stack trace
  error: (
    message: string,
    error?: Error | unknown,
    meta?: Record<string, any>
  ) => {
    if (error instanceof Error) {
      logger.error(`${message}: ${error.message}`, {
        stack: error.stack,
        ...meta,
      });
    } else {
      logger.error(message, meta);
    }
  },

  // Log de warning
  warn: (message: string, meta?: Record<string, any>) => {
    logger.warn(message, meta);
  },

  // Log de informação
  info: (message: string, meta?: Record<string, any>) => {
    logger.info(message, meta);
  },

  // Log de HTTP requests
  http: (message: string, meta?: Record<string, any>) => {
    logger.http(message, meta);
  },

  // Log de debug
  debug: (message: string, meta?: Record<string, any>) => {
    logger.debug(message, meta);
  },

  // Log de início da aplicação
  startup: (port: number, environment: string) => {
    logger.info("🚀 Server starting up", {
      port,
      environment,
      timestamp: new Date().toISOString(),
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
    });
  },

  // Log de shutdown da aplicação
  shutdown: (signal: string) => {
    logger.info("🛑 Server shutting down", {
      signal,
      timestamp: new Date().toISOString(),
    });
  },

  // Log de health check
  health: (status: string, details?: Record<string, any>) => {
    logger.info(`🏥 Health check: ${status}`, details);
  },
};

// Middleware de logging para Hono
export const createLoggingMiddleware = () => {
  return async (c: any, next: any) => {
    const startTime = Date.now();
    const { method, url } = c.req;

    // Log da requisição
    log.http(`Incoming ${method} request`, {
      method,
      url,
      userAgent: c.req.header("User-Agent"),
      ip:
        c.req.header("X-Forwarded-For") ||
        c.req.header("X-Real-IP") ||
        "unknown",
      timestamp: new Date().toISOString(),
    });

    try {
      await next();

      const duration = Date.now() - startTime;
      const status = c.res.status;

      // Log da resposta
      log.http(`Completed ${method} ${url}`, {
        method,
        url,
        status,
        duration: `${duration}ms`,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      const duration = Date.now() - startTime;

      // Log de erro
      log.error(`Request failed: ${method} ${url}`, error, {
        method,
        url,
        duration: `${duration}ms`,
        timestamp: new Date().toISOString(),
      });

      throw error;
    }
  };
};

// Logger para tRPC
export const createTRPCLogger = () => {
  return {
    log: (message: string, meta?: Record<string, any>) => {
      log.info(`[tRPC] ${message}`, meta);
    },

    error: (
      message: string,
      error?: Error | unknown,
      meta?: Record<string, any>
    ) => {
      log.error(`[tRPC] ${message}`, error, meta);
    },

    warn: (message: string, meta?: Record<string, any>) => {
      log.warn(`[tRPC] ${message}`, meta);
    },

    debug: (message: string, meta?: Record<string, any>) => {
      log.debug(`[tRPC] ${message}`, meta);
    },
  };
};

export default logger;
