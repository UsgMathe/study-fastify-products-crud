import z, { number } from 'zod';

export const CreateProductSchema = z.object({
  name: z.string(),
  price: z.number(),
});

export const ProductSchema = z.union([
  CreateProductSchema,
  z.object({
    id: number(),
    created_at: z.string().datetime(),
  }),
]);

export type Product = z.infer<typeof ProductSchema>;
export type CreateProduct = z.infer<typeof CreateProductSchema>;
