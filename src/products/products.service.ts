import { ResultSetHeader } from 'mysql2';
import { connection } from '../database/mysql.db';
import { CreateProduct, Product } from './products.schema';

export async function useProductsDatabase() {
  const db = await connection();

  async function create(product: CreateProduct) {
    const [results] = await db.query<ResultSetHeader>(
      `
      INSERT INTO
        products (name, price)
      VALUES
        (?, ?)
      `,
      [product.name, product.price]
    );

    return { id: results.insertId, ...product };
  }

  async function getAll() {
    const [result] = await db.query(`
      SELECT * FROM products
    `);

    return result as Product[];
  }

  return { create, getAll };
}
