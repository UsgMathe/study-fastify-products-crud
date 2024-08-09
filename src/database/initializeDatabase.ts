import { connection } from './mysql.db';

export async function initializeDatabase() {
  const db = await connection();

  try {
    await db.query(
      `
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
    );

    console.log('Products table is successfully created!');
  } catch (error) {
    console.error('Failed to create products table: ' + error);
  }
}
