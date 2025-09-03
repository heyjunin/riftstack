import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { Hono } from "hono";
import { createContext } from "./context";
import { createLoggingMiddleware, log } from "./lib/logger";
import { cors } from "./middleware/cors";
import { appRouter } from "./router";

const app = new Hono();

// Adicionar middleware CORS primeiro
app.use(
  "*",
  cors({
    origin: process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
      : process.env.NODE_ENV === "production"
      ? ["https://yourdomain.com"]
      : ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: process.env.CORS_CREDENTIALS === "true",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
      "X-Forwarded-For",
      "X-Real-IP",
    ],
  })
);

// Adicionar middleware de logging
app.use("*", createLoggingMiddleware());

// Handle Chrome DevTools specific routes first
app.get("/.well-known/appspecific/com.chrome.devtools.json", (c) => {
  log.debug("Chrome DevTools route accessed", {
    ip:
      c.req.header("X-Forwarded-For") || c.req.header("X-Real-IP") || "unknown",
    userAgent: c.req.header("User-Agent"),
  });

  return c.json({
    name: "React Router + tRPC + Hono App",
    version: "1.0.0",
    description: "A full-stack application with React Router, tRPC, and Hono",
  });
});

// Handle tRPC routes
app.all("/trpc/*", async (c) => {
  const path = c.req.path;
  log.debug("tRPC request received", {
    path,
    method: c.req.method,
    ip:
      c.req.header("X-Forwarded-For") || c.req.header("X-Real-IP") || "unknown",
  });

  try {
    const response = await fetchRequestHandler({
      endpoint: "/trpc",
      req: c.req.raw,
      router: appRouter,
      createContext: () => createContext(c),
    });

    log.debug("tRPC request processed successfully", {
      path,
      method: c.req.method,
      status: response.status,
    });

    return response;
  } catch (error) {
    log.error("tRPC request failed", error, {
      path,
      method: c.req.method,
      ip:
        c.req.header("X-Forwarded-For") ||
        c.req.header("X-Real-IP") ||
        "unknown",
    });
    throw error;
  }
});

// Catch-all route for unmatched paths
app.all("*", (c) => {
  log.warn("Route not found", {
    path: c.req.path,
    method: c.req.method,
    ip:
      c.req.header("X-Forwarded-For") || c.req.header("X-Real-IP") || "unknown",
    userAgent: c.req.header("User-Agent"),
  });

  return c.json({ error: "Route not found" }, 404);
});

// Start server if this file is run directly
if (typeof Bun !== "undefined") {
  const port = parseInt(process.env.PORT || "3001", 10);
  const environment = process.env.NODE_ENV || "development";

  // Log de startup
  log.startup(port, environment);

  console.log(`🚀 Server running on http://localhost:${port}`);

  const server = Bun.serve({
    port,
    fetch: app.fetch,
  });

  // Graceful shutdown
  const shutdown = (signal: string) => {
    log.shutdown(signal);
    server.stop();
    process.exit(0);
  };

  // Capturar sinais de shutdown
  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGQUIT", () => shutdown("SIGQUIT"));

  // Capturar erros não tratados
  process.on("uncaughtException", (error) => {
    log.error("Uncaught Exception", error);
    shutdown("uncaughtException");
  });

  process.on("unhandledRejection", (reason, promise) => {
    log.error("Unhandled Rejection", new Error(String(reason)), {
      promise: promise.toString(),
    });
    shutdown("unhandledRejection");
  });
}

export default app;
