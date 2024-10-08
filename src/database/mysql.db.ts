import mysql from 'mysql2/promise';
import { env } from '../env';

export async function connection() {
  let db = await mysql.createConnection({
    host: env.DATABASE_HOST,
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
  });

  return db;
}
