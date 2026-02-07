import { Pool } from 'pg';

const connectionString = process.env['DATABASE_URL'];

// BUILD GUARD: If we are building on Railway, the internal DB host is unreachable.
// We check for 'CI' or 'RAILWAY_GIT_COMMIT_SHA' which Railway sets during builds.
const isBuilding = !!process.env['RAILWAY_GIT_COMMIT_SHA'] || process.env['NODE_ENV'] === 'production' && !connectionString;

const pool = new Pool(
  connectionString && !isBuilding
    ? { connectionString }
    : {
        // Fallback for local development
        user: 'jacobpilegaard',
        host: 'localhost',
        database: 'blog',
        password: '',
        port: 5432,
        // CRITICAL: Set max connections to 0 during build to prevent ENOTFOUND
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