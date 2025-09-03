import { TRPCError, initTRPC } from "@trpc/server";
import type { Context } from "./context";
import { log } from "./lib/logger";
import {
  adminProcedure,
  authenticatedProcedure,
  publicProcedure,
} from "./middleware/auth";
import { updateSchema } from "./schemas";

const t = initTRPC.context<Context>().create();
const router = t.router;

export const createCallerFactory = t.createCallerFactory;

export const appRouter = router({
  // Rotas públicas
  update: publicProcedure.input(updateSchema).mutation(({ input }) => {
    log.info("Update operation performed", { input });
    return { success: true };
  }),

  get: publicProcedure.query(() => {
    log.debug("Get operation requested");
    return {
      id: 4,
      status: "active",
    };
  }),

  // Autenticação
  auth: router({
    register: publicProcedure
      .input((input: unknown) => {
        if (
          typeof input === "object" &&
          input !== null &&
          "email" in input &&
          "username" in input &&
          "password" in input
        ) {
          return {
            email: String(input.email),
            username: String(input.username),
            password: String(input.password),
          };
        }
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid input for registration",
        });
      })
      .mutation(async ({ ctx, input }) => {
        try {
          log.info("User registration attempt", {
            email: input.email,
            username: input.username,
            ip:
              ctx.c?.req.header("X-Forwarded-For") ||
              ctx.c?.req.header("X-Real-IP") ||
              "unknown",
          });

          const result = await ctx.authService.register(
            input.email,
            input.username,
            input.password
          );

          // Set auth cookie
          ctx.setAuthCookie(result.token);

          log.info("User registered successfully", {
            userId: result.user.id,
            email: result.user.email,
            username: result.user.username,
            role: result.user.role,
            ip:
              ctx.c?.req.header("X-Forwarded-For") ||
              ctx.c?.req.header("X-Real-IP") ||
              "unknown",
          });

          return result;
        } catch (error) {
          log.error("User registration failed", error, {
            email: input.email,
            username: input.username,
            ip:
              ctx.c?.req.header("X-Forwarded-For") ||
              ctx.c?.req.header("X-Real-IP") ||
              "unknown",
          });

          throw new TRPCError({
            code: "BAD_REQUEST",
            message:
              error instanceof Error ? error.message : "Registration failed",
          });
        }
      }),

    login: publicProcedure
      .input((input: unknown) => {
        if (
          typeof input === "object" &&
          input !== null &&
          "email" in input &&
          "password" in input
        ) {
          return {
            email: String(input.email),
            password: String(input.password),
          };
        }
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid input for login",
        });
      })
      .mutation(async ({ ctx, input }) => {
        try {
          log.info("User login attempt", {
            email: input.email,
            ip:
              ctx.c?.req.header("X-Forwarded-For") ||
              ctx.c?.req.header("X-Real-IP") ||
              "unknown",
          });

          const result = await ctx.authService.login(
            input.email,
            input.password
          );

          // Set auth cookie
          ctx.setAuthCookie(result.token);

          log.info("User logged in successfully", {
            userId: result.user.id,
            email: result.user.email,
            username: result.user.username,
            role: result.user.role,
            ip:
              ctx.c?.req.header("X-Forwarded-For") ||
              ctx.c?.req.header("X-Real-IP") ||
              "unknown",
          });

          return result;
        } catch (error) {
          log.warn("User login failed", {
            email: input.email,
            error: error instanceof Error ? error.message : "Unknown error",
            ip:
              ctx.c?.req.header("X-Forwarded-For") ||
              ctx.c?.req.header("X-Real-IP") ||
              "unknown",
          });

          throw new TRPCError({
            code: "UNAUTHORIZED",
            message:
              error instanceof Error ? error.message : "Invalid credentials",
          });
        }
      }),

    logout: publicProcedure.mutation(async ({ ctx }) => {
      if (ctx.currentUser) {
        log.info("User logged out", {
          userId: ctx.currentUser.id,
          email: ctx.currentUser.email,
          ip:
            ctx.c?.req.header("X-Forwarded-For") ||
            ctx.c?.req.header("X-Real-IP") ||
            "unknown",
        });
      }

      ctx.clearAuthCookie();
      return { success: true };
    }),

    me: authenticatedProcedure.query(async ({ ctx }) => {
      log.debug("User profile requested", {
        userId: ctx.currentUser!.id,
        email: ctx.currentUser!.email,
        ip:
          ctx.c?.req.header("X-Forwarded-For") ||
          ctx.c?.req.header("X-Real-IP") ||
          "unknown",
      });

      return ctx.currentUser;
    }),
  }),

  // Rotas autenticadas
  user: router({
    profile: authenticatedProcedure.query(async ({ ctx }) => {
      log.debug("User profile accessed", {
        userId: ctx.currentUser!.id,
        email: ctx.currentUser!.email,
        ip:
          ctx.c?.req.header("X-Forwarded-For") ||
          ctx.c?.req.header("X-Real-IP") ||
          "unknown",
      });

      return ctx.currentUser;
    }),

    updateProfile: authenticatedProcedure
      .input((input: unknown) => {
        if (
          typeof input === "object" &&
          input !== null &&
          "username" in input
        ) {
          return {
            username: String(input.username),
            email: "email" in input ? String(input.email) : undefined,
          };
        }
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid input for profile update",
        });
      })
      .mutation(async ({ ctx, input }) => {
        try {
          log.info("Profile update attempt", {
            userId: ctx.currentUser!.id,
            email: ctx.currentUser!.email,
            updates: input,
            ip:
              ctx.c?.req.header("X-Forwarded-For") ||
              ctx.c?.req.header("X-Real-IP") ||
              "unknown",
          });

          const result = await ctx.authService.updateProfile(
            ctx.currentUser!.id,
            input
          );

          if (!result) {
            log.error("Profile update failed - user not found", {
              userId: ctx.currentUser!.id,
              ip:
                ctx.c?.req.header("X-Forwarded-For") ||
                ctx.c?.req.header("X-Real-IP") ||
                "unknown",
            });

            throw new TRPCError({
              code: "NOT_FOUND",
              message: "User not found",
            });
          }

          log.info("Profile updated successfully", {
            userId: result.id,
            email: result.email,
            username: result.username,
            ip:
              ctx.c?.req.header("X-Forwarded-For") ||
              ctx.c?.req.header("X-Real-IP") ||
              "unknown",
          });

          return result;
        } catch (error) {
          log.error("Profile update failed", error, {
            userId: ctx.currentUser!.id,
            updates: input,
            ip:
              ctx.c?.req.header("X-Forwarded-For") ||
              ctx.c?.req.header("X-Real-IP") ||
              "unknown",
          });

          throw new TRPCError({
            code: "BAD_REQUEST",
            message:
              error instanceof Error ? error.message : "Profile update failed",
          });
        }
      }),

    changePassword: authenticatedProcedure
      .input((input: unknown) => {
        if (
          typeof input === "object" &&
          input !== null &&
          "currentPassword" in input &&
          "newPassword" in input
        ) {
          return {
            currentPassword: String(input.currentPassword),
            newPassword: String(input.newPassword),
          };
        }
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid input for password change",
        });
      })
      .mutation(async ({ ctx, input }) => {
        try {
          log.info("Password change attempt", {
            userId: ctx.currentUser!.id,
            email: ctx.currentUser!.email,
            ip:
              ctx.c?.req.header("X-Forwarded-For") ||
              ctx.c?.req.header("X-Real-IP") ||
              "unknown",
          });

          const success = await ctx.authService.changePassword(
            ctx.currentUser!.id,
            input.currentPassword,
            input.newPassword
          );

          if (!success) {
            log.warn("Password change failed - incorrect current password", {
              userId: ctx.currentUser!.id,
              email: ctx.currentUser!.email,
              ip:
                ctx.c?.req.header("X-Forwarded-For") ||
                ctx.c?.req.header("X-Real-IP") ||
                "unknown",
            });

            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Current password is incorrect",
            });
          }

          log.info("Password changed successfully", {
            userId: ctx.currentUser!.id,
            email: ctx.currentUser!.email,
            ip:
              ctx.c?.req.header("X-Forwarded-For") ||
              ctx.c?.req.header("X-Real-IP") ||
              "unknown",
          });

          return { success: true };
        } catch (error) {
          log.error("Password change failed", error, {
            userId: ctx.currentUser!.id,
            email: ctx.currentUser!.email,
            ip:
              ctx.c?.req.header("X-Forwarded-For") ||
              ctx.c?.req.header("X-Real-IP") ||
              "unknown",
          });

          throw new TRPCError({
            code: "BAD_REQUEST",
            message:
              error instanceof Error ? error.message : "Password change failed",
          });
        }
      }),
  }),

  // Rotas de admin
  admin: router({
    users: adminProcedure.query(async ({ ctx }) => {
      log.info("Admin accessing users list", {
        adminUserId: ctx.currentUser!.id,
        adminEmail: ctx.currentUser!.email,
        ip:
          ctx.c?.req.header("X-Forwarded-For") ||
          ctx.c?.req.header("X-Real-IP") ||
          "unknown",
      });

      // For mock implementation, return mock users
      return [
        {
          id: "1",
          email: "admin@example.com",
          username: "admin",
          role: "admin",
        },
        { id: "2", email: "user@example.com", username: "user", role: "user" },
      ];
    }),
  }),
});

export const createCaller = createCallerFactory(appRouter);
export type AppRouter = typeof appRouter;
