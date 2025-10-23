import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    let query = `
      SELECT 
        id, name, city, state, type, control,
        total_enrollment, undergrad_enrollment, grad_enrollment,
        acceptance_rate, graduation_rate,
        tuition_in_state, tuition_out_state,
        website, programs
      FROM colleges
      WHERE 1=1
    `;
    
    const params: any[] = [];
    
    if (search) {
      query += ` AND (
        name ILIKE $${params.length + 1} OR
        city ILIKE $${params.length + 1} OR
        state ILIKE $${params.length + 1} OR
        programs::text ILIKE $${params.length + 1}
      )`;
      params.push(`%${search}%`);
    }
    
    query += ` ORDER BY total_enrollment DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);
    
    const client = await pool.connect();
    
    try {
      const result = await client.query(query, params);
      
      // Get total count
      let countQuery = 'SELECT COUNT(*) FROM colleges WHERE 1=1';
      const countParams: any[] = [];
      
      if (search) {
        countQuery += ` AND (
          name ILIKE $1 OR
          city ILIKE $1 OR
          state ILIKE $1 OR
          programs::text ILIKE $1
        )`;
        countParams.push(`%${search}%`);
      }
      
      const countResult = await client.query(countQuery, countParams);
      const total = parseInt(countResult.rows[0].count);
      
      return NextResponse.json({
        colleges: result.rows,
        total,
        limit,
        offset
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching colleges:', error);
    return NextResponse.json(
      { error: 'Failed to fetch colleges' },
      { status: 500 }
    );
  }
}
