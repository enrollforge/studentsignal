import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'studentsignal_db',
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const dateOfBirth = `${data.dobYear}-${data.dobMonth.padStart(2, '0')}-${data.dobDay.padStart(2, '0')}`;
    
    const result = await pool.query(
      `INSERT INTO students (
        first_name, last_name, email, user_type, gender, date_of_birth,
        first_generation, ethnicity, high_school_graduation_date,
        expected_college_start_term, high_school_name, intended_majors,
        is_undecided, gpa, college_size_preference, distance_from_home,
        home_city, home_state, home_zip, profile_completed
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
      RETURNING id`,
      [
        data.firstName,
        data.lastName,
        data.email,
        data.userType,
        data.gender || null,
        dateOfBirth,
        data.firstGeneration === 'yes',
        data.ethnicity,
        data.graduationYear,
        data.startTerm,
        data.highSchool,
        data.majors,
        data.isUndecided,
        data.gpa ? parseFloat(data.gpa) : null,
        data.collegeSize,
        data.distanceFromHome,
        data.homeCity,
        data.homeState,
        data.homeZip,
        true
      ]
    );

    const studentId = result.rows[0].id;

    // Auto-generate matches for the new student
    await generateMatches(studentId, data.homeState);

    return NextResponse.json({ 
      success: true, 
      studentId: studentId 
    });
  } catch (error) {
    console.error('Error creating student:', error);
    return NextResponse.json(
      { error: 'Failed to create student profile' },
      { status: 500 }
    );
  }
}

async function generateMatches(studentId: number, homeState: string) {
  try {
    // Get 10 random colleges, prioritizing home state
    const collegesResult = await pool.query(`
      SELECT * FROM colleges 
      WHERE state = $1
      ORDER BY RANDOM() 
      LIMIT 5
      UNION
      SELECT * FROM colleges 
      WHERE state != $1
      ORDER BY RANDOM() 
      LIMIT 5
    `, [homeState || 'CA']);
    
    for (const college of collegesResult.rows) {
      let matchScore = 50;
      const matchReasons: string[] = [];
      
      if (homeState && college.state === homeState) {
        matchScore += 20;
        matchReasons.push('In your home state');
      }
      
      if (college.acceptance_rate && college.acceptance_rate > 0.5) {
        matchScore += 15;
        matchReasons.push('Good acceptance rate');
      }
      
      if (college.graduation_rate && college.graduation_rate > 0.6) {
        matchScore += 15;
        matchReasons.push('Strong graduation rate');
      }
      
      await pool.query(
        `INSERT INTO student_matches (student_id, college_id, match_score, match_reasons)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (student_id, college_id) DO NOTHING`,
        [studentId, college.id, Math.min(matchScore, 99), matchReasons]
      );
    }
  } catch (error) {
    console.error('Error generating matches:', error);
  }
}
