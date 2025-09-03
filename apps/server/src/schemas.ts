import { z } from "zod";
import { status } from "./types";

export const updateSchema = z.object({
  id: z.number(),
  status: z.enum(status),
});

// Auth Schemas
export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export const registerSchema = z.object({
  email: z.string().email("Email inválido"),
  username: z
    .string()
    .min(3, "Username deve ter pelo menos 3 caracteres")
    .max(20, "Username deve ter no máximo 20 caracteres"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export const updateProfileSchema = z.object({
  username: z
    .string()
    .min(3, "Username deve ter pelo menos 3 caracteres")
    .max(20, "Username deve ter no máximo 20 caracteres"),
  email: z.string().email("Email inválido").optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Senha atual é obrigatória"),
  newPassword: z.string().min(6, "Nova senha deve ter pelo menos 6 caracteres"),
});
