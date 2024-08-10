import { ResultSetHeader } from 'mysql2';
import { ERRORS } from '../constants/errors';
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

  async function get(productId: number) {
    const [result] = await db.query(
      `
      SELECT * FROM products
      WHERE id = ?   
    `,
      productId
    );

    const products = result as Product[];

    return products[0];
  }

  async function update(productId: number, product: CreateProduct) {
    const findedProduct = await get(productId);

    if (findedProduct) {
      await db.query(
        `
        UPDATE products
        SET
          name = ?,
          price = ?
        WHERE id = ?
      `,
        [product.name, product.price, productId]
      );

      const insertedProduct = await get(productId);

      return insertedProduct;
    } else {
      const error = ERRORS.NOT_FOUND_PRODUCT(productId);
      throw error;
    }
  }

  async function DELETE(productId: number) {
    const product = await get(productId);

    if (product) {
      const [result] = await db.query(
        `
      DELETE FROM products
      WHERE id = ?
      `,
        productId
      );

      return result;
    } else {
      const error = ERRORS.NOT_FOUND_PRODUCT(productId);
      throw error;
    }
  }

  return { create, getAll, get, update, DELETE };
}
