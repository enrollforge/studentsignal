import pool from '../lib/db';

async function setupDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('Creating colleges table...');
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS colleges (
        id SERIAL PRIMARY KEY,
        unitid INTEGER UNIQUE,
        name VARCHAR(255) NOT NULL,
        city VARCHAR(100),
        state VARCHAR(50),
        zip VARCHAR(20),
        website VARCHAR(255),
        type VARCHAR(100),
        control VARCHAR(50),
        total_enrollment INTEGER,
        undergrad_enrollment INTEGER,
        grad_enrollment INTEGER,
        acceptance_rate DECIMAL(5,2),
        graduation_rate DECIMAL(5,2),
        tuition_in_state INTEGER,
        tuition_out_state INTEGER,
        latitude DECIMAL(10,7),
        longitude DECIMAL(10,7),
        phone VARCHAR(50),
        programs TEXT[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    console.log('Creating indexes...');
    
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_colleges_name ON colleges(name);
      CREATE INDEX IF NOT EXISTS idx_colleges_state ON colleges(state);
      CREATE INDEX IF NOT EXISTS idx_colleges_enrollment ON colleges(total_enrollment DESC);
    `);
    
    console.log('Database setup complete!');
  } catch (error) {
    console.error('Error setting up database:', error);
    throw error;
  } finally {
    client.release();
  }
}

setupDatabase()
  .then(() => {
    console.log('Success!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed:', error);
    process.exit(1);
  });
