// db/db.ts
import { Pool } from 'pg';

const connectionString = process.env['DATABASE_URL'];

// If there's no connection string, we assume we're building or local
const pool = new Pool(
  connectionString 
    ? { connectionString } 
    : { host: 'localhost', user: 'jacobpilegaard', database: 'blog' }
);

export async function getPosts() {
  // If we have a URL, use it. If not, only run if we're NOT in production
  if (!connectionString && process.env['NODE_ENV'] === 'production') {
    return []; 
  }

  const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
  return result.rows;
}