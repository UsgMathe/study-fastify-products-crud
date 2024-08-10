import { ERRORS } from '../constants/errors';
import { FastifyInstanceWithValidator } from '../types';
import { formatError, FormattedError } from '../utils/errorFormatter';
import { CreateProductSchema, ProductIdSchema } from './products.schema';
import { useProductsDatabase } from './products.service';

export async function productsController(app: FastifyInstanceWithValidator) {
  const productsDatabase = await useProductsDatabase();

  app.post(
    '/',
    { schema: { body: CreateProductSchema } },
    async (request, reply) => {
      const product = request.body;
      const insertedProduct = await productsDatabase.create(product);

      reply.send(insertedProduct);
    }
  );

  app.get('/', async () => {
    const products = await productsDatabase.getAll();
    return products;
  });

  app.get(
    '/:id',
    { schema: { params: ProductIdSchema } },
    async (request, reply) => {
      const { id } = request.params;

      const product = await productsDatabase.get(id);

      if (product) reply.send(product);
      else reply.code(404).send(ERRORS.NOT_FOUND_PRODUCT(id));
    }
  );

  app.put(
    '/:id',
    { schema: { params: ProductIdSchema, body: CreateProductSchema } },
    async (request, reply) => {
      const { id } = request.params;
      const product = request.body;

      const result = await productsDatabase.update(id, product);
      reply.send(result);
    }
  );

  app.delete(
    '/:id',
    { schema: { params: ProductIdSchema } },
    async (request, reply) => {
      const { id } = request.params;

      await productsDatabase
        .DELETE(id)
        .then(() => reply.code(204).send())
        .catch((error: FormattedError) =>
          reply.code(error.statusCode).send(error)
        );
    }
  );
}
