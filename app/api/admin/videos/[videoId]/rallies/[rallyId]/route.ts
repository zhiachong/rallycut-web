import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { videoId: string; rallyId: string } }
) {
  try {
    const { videoId, rallyId } = params;
    const body = await request.json();
    const { approved, startTime, endTime } = body;

    const updates: any = {};
    if (approved !== undefined) updates.approved = approved;
    if (startTime !== undefined) updates.start_time = startTime;
    if (endTime !== undefined) updates.end_time = endTime;

    const { data: rally, error } = await supabase
      .from('rallies')
      .update(updates)
      .eq('id', rallyId)
      .eq('video_id', videoId)
      .select()
      .single();

    if (error) {
      console.error('Rally update error:', error);
      return NextResponse.json(
        { error: 'Failed to update rally' },
        { status: 500 }
      );
    }

    return NextResponse.json({ rally });

  } catch (error) {
    console.error('Update rally error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { videoId: string; rallyId: string } }
) {
  try {
    const { videoId, rallyId } = params;

    const { error } = await supabase
      .from('rallies')
      .delete()
      .eq('id', rallyId)
      .eq('video_id', videoId);

    if (error) {
      console.error('Rally delete error:', error);
      return NextResponse.json(
        { error: 'Failed to delete rally' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Delete rally error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
