import z from 'zod';

const envSchema = z.object({
  HOST: z.string().ip(),
  PORT: z.coerce.number(),
  DATABASE_HOST: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),
});

export const env = envSchema.parse(process.env);
