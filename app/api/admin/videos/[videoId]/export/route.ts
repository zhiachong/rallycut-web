import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(
  request: NextRequest,
  { params }: { params: { videoId: string } }
) {
  try {
    const { videoId } = params;

    // Get approved rallies for this video
    const { data: rallies, error: ralliesError } = await supabase
      .from('rallies')
      .select('*')
      .eq('video_id', videoId)
      .eq('approved', true)
      .order('start_time', { ascending: true });

    if (ralliesError || !rallies || rallies.length === 0) {
      return NextResponse.json(
        { error: 'No approved rallies found' },
        { status: 400 }
      );
    }

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

    // In production, this would trigger a background job
    // For now, return the rally segments for FFmpeg processing
    const segments = rallies.map(r => ({
      start: r.start_time,
      end: r.end_time,
    }));

    // Update video status
    await supabase
      .from('videos')
      .update({ status: 'processing' })
      .eq('id', videoId);

    return NextResponse.json({
      success: true,
      videoId,
      segments,
      message: 'Export queued. Run FFmpeg processing.',
      ffmpegCommand: generateFFmpegCommand(video.storage_path, segments),
    });

  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function generateFFmpegCommand(inputPath: string, segments: { start: number; end: number }[]) {
  // Generate FFmpeg concat command
  const filters = segments.map((seg, i) => 
    `[0:v]trim=start=${seg.start}:end=${seg.end},setpts=PTS-STARTPTS[v${i}]; [0:a]atrim=start=${seg.start}:end=${seg.end},asetpts=PTS-STARTPTS[a${i}]`
  ).join('; ');
  
  const concatInputs = segments.map((_, i) => `[v${i}][a${i}]`).join('');
  const concatFilter = `${concatInputs}concat=n=${segments.length}:v=1:a=1[outv][outa]`;
  
  return `ffmpeg -i input.mp4 -filter_complex "${filters}; ${concatFilter}" -map "[outv]" -map "[outa]" -c:v libx264 -preset slow -crf 18 -c:a aac -b:a 192k output.mp4`;
}
