import type { Context, Next } from "hono";

export interface CorsOptions {
  origin?: string | string[] | boolean | RegExp | ((origin: string) => boolean);
  methods?: string[];
  allowedHeaders?: string[];
  exposedHeaders?: string[];
  credentials?: boolean;
  maxAge?: number;
  preflightContinue?: boolean;
  optionsSuccessStatus?: number;
}

const defaultOptions: CorsOptions = {
  origin: true,
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
  exposedHeaders: [],
  credentials: true,
  maxAge: 86400, // 24 hours
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

export function cors(options: CorsOptions = {}) {
  const opts = { ...defaultOptions, ...options };

  return async (c: Context, next: Next) => {
    const origin = c.req.header("Origin");
    const method = c.req.method;

    // Handle preflight requests
    if (method === "OPTIONS") {
      const requestMethod = c.req.header("Access-Control-Request-Method");
      const requestHeaders = c.req.header("Access-Control-Request-Headers");

      // Set CORS headers for preflight
      if (opts.origin !== false) {
        if (typeof opts.origin === "string") {
          c.header("Access-Control-Allow-Origin", opts.origin);
        } else if (Array.isArray(opts.origin)) {
          if (origin && opts.origin.includes(origin)) {
            c.header("Access-Control-Allow-Origin", origin);
          }
        } else if (opts.origin === true) {
          c.header("Access-Control-Allow-Origin", origin || "*");
        } else if (typeof opts.origin === "function") {
          if (origin && opts.origin(origin)) {
            c.header("Access-Control-Allow-Origin", origin);
          }
        } else if (opts.origin instanceof RegExp) {
          if (origin && opts.origin.test(origin)) {
            c.header("Access-Control-Allow-Origin", origin);
          }
        }
      }

      if (opts.methods && opts.methods.length > 0) {
        c.header("Access-Control-Allow-Methods", opts.methods.join(", "));
      }

      if (opts.allowedHeaders && opts.allowedHeaders.length > 0) {
        c.header(
          "Access-Control-Allow-Headers",
          opts.allowedHeaders.join(", ")
        );
      }

      if (opts.exposedHeaders && opts.exposedHeaders.length > 0) {
        c.header(
          "Access-Control-Expose-Headers",
          opts.exposedHeaders.join(", ")
        );
      }

      if (opts.credentials) {
        c.header("Access-Control-Allow-Credentials", "true");
      }

      if (opts.maxAge) {
        c.header("Access-Control-Max-Age", opts.maxAge.toString());
      }

      if (opts.preflightContinue) {
        return next();
      } else {
        return c.text("", (opts.optionsSuccessStatus || 204) as any);
      }
    }

    // Handle actual requests
    if (opts.origin !== false) {
      if (typeof opts.origin === "string") {
        c.header("Access-Control-Allow-Origin", opts.origin);
      } else if (Array.isArray(opts.origin)) {
        if (origin && opts.origin.includes(origin)) {
          c.header("Access-Control-Allow-Origin", origin);
        }
      } else if (opts.origin === true) {
        c.header("Access-Control-Allow-Origin", origin || "*");
      } else if (typeof opts.origin === "function") {
        if (origin && opts.origin(origin)) {
          c.header("Access-Control-Allow-Origin", origin);
        }
      } else if (opts.origin instanceof RegExp) {
        if (origin && opts.origin.test(origin)) {
          c.header("Access-Control-Allow-Origin", origin);
        }
      }
    }

    if (opts.exposedHeaders && opts.exposedHeaders.length > 0) {
      c.header("Access-Control-Expose-Headers", opts.exposedHeaders.join(", "));
    }

    if (opts.credentials) {
      c.header("Access-Control-Allow-Credentials", "true");
    }

    await next();
  };
}
