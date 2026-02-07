import { Pool } from 'pg';

const connectionString = process.env['DATABASE_URL'];

// If we have a DATABASE_URL, we are likely in production. 
// If we are in production but don't have a PORT yet, we are in the build phase.
const isBuilding = process.env['NODE_ENV'] === 'production' && !process.env['PORT'];

const pool = new Pool(
  connectionString && !isBuilding
    ? { connectionString }
    : {
        user: 'jacobpilegaard',
        host: 'localhost',
        database: 'blog',
        max: isBuilding ? 0 : 10 
      }
);


export async function getPosts() {
	console.log("FUCKING GETTING POSTS");
  // If we are currently in the Railway Build/Prerender phase, return dummy data
  if (isBuilding) {
    console.log('Build-time trace detected: Skipping live DB connection.');
    return []; 
  }

  try {
    const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
    return result.rows;
  } catch (err) {
    console.error('Database Error:', err);
    return [];
  }
}