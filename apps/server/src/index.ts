import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { Hono } from "hono";
import { createContext } from "./context";
import { appRouter } from "./router";

const app = new Hono();

// Handle Chrome DevTools specific routes first
app.get("/.well-known/appspecific/com.chrome.devtools.json", (c) => {
  return c.json({
    name: "React Router + tRPC + Hono App",
    version: "1.0.0",
    description: "A full-stack application with React Router, tRPC, and Hono",
  });
});

// Handle tRPC routes
app.all("/trpc/*", async (c) => {
  return await fetchRequestHandler({
    endpoint: "/trpc",
    req: c.req.raw,
    router: appRouter,
    createContext: () => createContext(c),
  });
});

// Catch-all route for unmatched paths
app.all("*", (c) => {
  return c.json({ error: "Route not found" }, 404);
});

export default app;
