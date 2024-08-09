// ROTAS GET POST PUT DELETE

import { FastifyInstanceWithValidator } from '../types';
import { CreateProductSchema } from './products.schema';
import { useProductsDatabase } from './products.service';

export async function productsController(app: FastifyInstanceWithValidator) {
  app.post(
    '/',
    { schema: { body: CreateProductSchema } },
    async (request, reply) => {
      const product = request.body;
      const productsDatabase = await useProductsDatabase();
      const insertedProduct = await productsDatabase.create(product);

      reply.send(insertedProduct);
    }
  );

  app.get('/', async () => {
    const procutsDatabase = await useProductsDatabase();
    const products = await procutsDatabase.getAll();

    return products;
  });
}
