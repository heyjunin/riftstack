import { TRPCError, initTRPC } from "@trpc/server";
import type { Context } from "../context";
import { log } from "../lib/logger";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

// Middleware para verificar se o usuário está autenticado
export const requireAuth = t.middleware(({ ctx, next }) => {
  if (!ctx.currentUser) {
    log.warn("Unauthorized access attempt", {
      ip:
        ctx.c?.req.header("X-Forwarded-For") ||
        ctx.c?.req.header("X-Real-IP") ||
        "unknown",
      userAgent: ctx.c?.req.header("User-Agent"),
      path: ctx.c?.req.url,
    });

    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource",
    });
  }

  log.debug("Authenticated user accessing protected resource", {
    userId: ctx.currentUser.id,
    email: ctx.currentUser.email,
    role: ctx.currentUser.role,
    ip:
      ctx.c?.req.header("X-Forwarded-For") ||
      ctx.c?.req.header("X-Real-IP") ||
      "unknown",
  });

  return next({
    ctx: {
      ...ctx,
      user: ctx.currentUser,
    },
  });
});

// Middleware para verificar se o usuário é admin
export const requireAdmin = t.middleware(({ ctx, next }) => {
  if (!ctx.currentUser) {
    log.warn("Unauthorized access attempt to admin resource", {
      ip:
        ctx.c?.req.header("X-Forwarded-For") ||
        ctx.c?.req.header("X-Real-IP") ||
        "unknown",
      userAgent: ctx.c?.req.header("User-Agent"),
      path: ctx.c?.req.url,
    });

    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource",
    });
  }

  if (ctx.currentUser.role !== "admin") {
    log.warn("Forbidden access attempt to admin resource", {
      userId: ctx.currentUser.id,
      email: ctx.currentUser.email,
      role: ctx.currentUser.role,
      ip:
        ctx.c?.req.header("X-Forwarded-For") ||
        ctx.c?.req.header("X-Real-IP") ||
        "unknown",
      path: ctx.c?.req.url,
    });

    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You must be an admin to access this resource",
    });
  }

  log.info("Admin user accessing admin resource", {
    userId: ctx.currentUser.id,
    email: ctx.currentUser.email,
    role: ctx.currentUser.role,
    ip:
      ctx.c?.req.header("X-Forwarded-For") ||
      ctx.c?.req.header("X-Real-IP") ||
      "unknown",
  });

  return next({
    ctx: {
      ...ctx,
      user: ctx.currentUser,
    },
  });
});

// Procedures autenticadas
export const authenticatedProcedure = publicProcedure.use(requireAuth);
export const adminProcedure = publicProcedure.use(requireAdmin);
