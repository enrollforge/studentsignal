import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'studentsignal_db',
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
});

// Generate matches for a student based on their preferences
export async function POST(request: NextRequest) {
  try {
    const { studentId } = await request.json();
    
    // Get student data
    const studentResult = await pool.query('SELECT * FROM students WHERE id = $1', [studentId]);
    const student = studentResult.rows[0];
    
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }
    
    // Get colleges that match student preferences
    let query = 'SELECT * FROM colleges WHERE 1=1';
    const params: any[] = [];
    
    // Filter by state if distance preference is set
    if (student.distance_from_home !== 'any_location' && student.home_state) {
      params.push(student.home_state);
      query += ` AND state = $${params.length}`;
    }
    
    query += ' ORDER BY RANDOM() LIMIT 10';
    
    const collegesResult = await pool.query(query, params);
    
    // Create matches with scores
    for (const college of collegesResult.rows) {
      let matchScore = 50; // Base score
      const matchReasons: string[] = [];
      
      // Increase score based on various factors
      if (student.home_state === college.state) {
        matchScore += 20;
        matchReasons.push('In your home state');
      }
      
      if (college.acceptance_rate && college.acceptance_rate > 0.5) {
        matchScore += 10;
        matchReasons.push('Good acceptance rate');
      }
      
      if (college.graduation_rate && college.graduation_rate > 0.6) {
        matchScore += 10;
        matchReasons.push('Strong graduation rate');
      }
      
      // Check if match already exists
      const existingMatch = await pool.query(
        'SELECT id FROM student_matches WHERE student_id = $1 AND college_id = $2',
        [studentId, college.id]
      );
      
      if (existingMatch.rows.length === 0) {
        await pool.query(
          `INSERT INTO student_matches (student_id, college_id, match_score, match_reasons)
           VALUES ($1, $2, $3, $4)`,
          [studentId, college.id, Math.min(matchScore, 99), matchReasons]
        );
      }
    }
    
    return NextResponse.json({ success: true, matchesGenerated: collegesResult.rows.length });
  } catch (error) {
    console.error('Error generating matches:', error);
    return NextResponse.json({ error: 'Failed to generate matches' }, { status: 500 });
  }
}
