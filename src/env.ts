import z from 'zod';

const envSchema = z.object({
  SERVER_HOST: z.string().ip(),
  SERVER_PORT: z.coerce.number(),
  DATABASE_HOST: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),
});

export const env = envSchema.parse(process.env);
