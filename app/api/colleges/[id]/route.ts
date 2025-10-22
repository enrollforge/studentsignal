import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        `SELECT 
          id, name, city, state, type, control,
          total_enrollment, undergrad_enrollment, grad_enrollment,
          acceptance_rate, graduation_rate,
          tuition_in_state, tuition_out_state,
          website, programs
        FROM colleges
        WHERE id = $1`,
        [params.id]
      );
      
      if (result.rows.length === 0) {
        return NextResponse.json(
          { error: 'College not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(result.rows[0]);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching college:', error);
    return NextResponse.json(
      { error: 'Failed to fetch college' },
      { status: 500 }
    );
  }
}
