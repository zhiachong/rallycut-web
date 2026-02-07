import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Simple admin check - in production, use proper auth middleware
const ADMIN_EMAILS = ['zhia@rallycut.com']; // Add your admin emails

export async function GET(request: NextRequest) {
  try {
    // Get all videos with their processing status
    const { data: videos, error } = await supabase
      .from('videos')
      .select(`
        *,
        rallies (*),
        processing_jobs (*)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Admin videos fetch error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch videos' },
        { status: 500 }
      );
    }

    return NextResponse.json({ videos: videos || [] });

  } catch (error) {
    console.error('Admin API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
