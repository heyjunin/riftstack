import { createTRPCReact } from '@trpc/react-query';

// Define o tipo do router localmente para evitar problemas de importação
export type AppRouter = any;

export const trpc = createTRPCReact<AppRouter>();
