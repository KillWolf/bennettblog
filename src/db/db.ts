import { Pool } from 'pg';

// Use the DATABASE_URL from Railway, or fall back to your local config
const pool = new Pool({
  connectionString: process.env["DATABASE_URL"] || 'postgresql://jacobpilegaard@localhost:5432/blog',
  // Note: 'postgresql://user:password@host:port/database'
});

export async function getPosts() {
  const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
  return result.rows;
}