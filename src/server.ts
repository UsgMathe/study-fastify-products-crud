import fastify from 'fastify';
import {
  ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { env } from './env';
import { errorHandler } from './error-handler';
import { initializeDatabase } from './database/initializeDatabase';
import { productsController } from './products/products.routes';

initializeDatabase();

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setErrorHandler(errorHandler);
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(productsController, { prefix: 'products' });

app.get('/', (_, reply) => {
  reply.send('🔥 Hello World! :)');
});

app.listen({ host: env.SERVER_HOST, port: env.SERVER_PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🔥 Server is running on ${address}`);
});
