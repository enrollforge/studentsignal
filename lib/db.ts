import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'studentsignal_db',
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
});

export default pool;
