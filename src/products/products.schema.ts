import z, { number } from 'zod';

export const CreateProductSchema = z.object({
  name: z.string(),
  price: z.number(),
});

export const ProductSchema = z.intersection(
  CreateProductSchema,
  z.object({
    id: number(),
    created_at: z.string().datetime(),
  })
);

export const ProductIdSchema = z.object({ id: z.coerce.number() });

export type Product = z.infer<typeof ProductSchema>;
export type CreateProduct = z.infer<typeof CreateProductSchema>;
