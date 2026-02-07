import { Pool } from 'pg';

const pool = new Pool({
  user: 'jacobpilegaard',  // Your actual username
  host: 'localhost',
  database: 'blog',
  password: '',  // Usually empty for local user
  port: 5432,
});

export async function getPosts() {
  const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
  return result.rows;
}