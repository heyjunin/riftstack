import type { Context as HonoContext } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import type { BlankEnv, BlankInput } from "hono/types";
import { log } from "./lib/logger";
import { AuthService } from "./services/auth-service";
import type { AuthUser } from "./types";

export async function createContext(
  c?: HonoContext<BlankEnv, "/trpc/*", BlankInput>
) {
  const authService = new AuthService();
  let currentUser: AuthUser | null = null;

  // Extract JWT token from cookies or headers
  if (c) {
    const token =
      getCookie(c, "auth-token") ||
      c.req.header("Authorization")?.replace("Bearer ", "");

    if (token) {
      try {
        currentUser = await authService.validateToken(token);
        log.debug("User authenticated", {
          userId: currentUser?.id,
          email: currentUser?.email,
          role: currentUser?.role,
          ip:
            c.req.header("X-Forwarded-For") ||
            c.req.header("X-Real-IP") ||
            "unknown",
        });
      } catch (error) {
        // Token invalid, user will remain null
        log.warn("Invalid token", {
          error: error instanceof Error ? error.message : "Unknown error",
          ip:
            c.req.header("X-Forwarded-For") ||
            c.req.header("X-Real-IP") ||
            "unknown",
          userAgent: c.req.header("User-Agent"),
        });
      }
    } else {
      log.debug("No authentication token provided", {
        ip:
          c.req.header("X-Forwarded-For") ||
          c.req.header("X-Real-IP") ||
          "unknown",
        userAgent: c.req.header("User-Agent"),
      });
    }
  }

  return {
    c,
    authService,
    currentUser,
    setUserIdCookie: (userId: string) => {
      if (c === undefined) {
        return;
      }
      setCookie(c, "userId", userId, {});
      log.debug("User ID cookie set", { userId });
    },
    setAuthCookie: (token: string) => {
      if (c === undefined) {
        return;
      }
      setCookie(c, "auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });
      log.info("Authentication cookie set", {
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: "7 days",
      });
    },
    clearAuthCookie: () => {
      if (c === undefined) {
        return;
      }
      setCookie(c, "auth-token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 0,
      });
      log.info("Authentication cookie cleared");
    },
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
