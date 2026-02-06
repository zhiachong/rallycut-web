'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Check, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    if (sessionId) {
      // In a real app, you might want to verify the session with your backend
      setStatus('success');
    } else {
      setStatus('error');
    }
  }, [sessionId]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-green-500 mx-auto mb-4" />
          <p className="text-zinc-400">Verifying your subscription...\u003c/p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-white mb-4">Something went wrong</h1>
          <p className="text-zinc-400 mb-6">
            We couldn't verify your subscription. Please try again or contact support.
          </p>
          <Link href="/">
            <Button className="bg-gradient-to-r from-green-500 to-emerald-600">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-6">
          <Check className="h-10 w-10 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">Welcome to RallyCut!</h1>
        
        <p className="text-zinc-400 mb-2">
          Your 7-day free trial is now active.
        </p>
        <p className="text-zinc-500 text-sm mb-8">
          You can now upload your tennis videos and get AI-generated highlights.
        </p>
        
        <div className="space-y-3">
          <Link href="/#upload">
            <Button 
              size="lg"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700"
            >
              Upload Your First Video
            </Button>
          </Link>
          
          <Link href="/">
            <Button 
              variant="outline" 
              className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
