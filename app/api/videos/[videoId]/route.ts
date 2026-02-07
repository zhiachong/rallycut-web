import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: { videoId: string } }
) {
  try {
    const { videoId } = params;

    // Get video details
    const { data: video, error: videoError } = await supabase
      .from('videos')
      .select('*')
      .eq('id', videoId)
      .single();

    if (videoError || !video) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    // Get rallies for this video
    const { data: rallies, error: ralliesError } = await supabase
      .from('rallies')
      .select('*')
      .eq('video_id', videoId)
      .order('start_time', { ascending: true });

    if (ralliesError) {
      console.error('Rallies fetch error:', ralliesError);
    }

    return NextResponse.json({
      video: {
        id: video.id,
        fileName: video.file_name,
        status: video.status,
        youtubeUrl: video.youtube_url,
        downloadUrl: video.download_url,
        createdAt: video.created_at,
      },
      rallies: rallies || [],
    });

  } catch (error) {
    console.error('Get video error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
