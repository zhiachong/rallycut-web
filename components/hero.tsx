'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-zinc-900 to-zinc-950 py-20 sm:py-32">
      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-900/50 px-3 py-1 text-sm font-medium text-zinc-400 backdrop-blur-sm mb-8">
            <Sparkles className="mr-2 h-4 w-4 text-yellow-500" />
            <span>Now with 4K export</span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            SwingVision for{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
              highlights
            </span>
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-zinc-400 sm:text-xl">
            Get 4K highlights from your tennis matches. 7-day free trial. No credit card required.
          </p>
          
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              onClick={onGetStarted}
              className="group bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 px-8 py-6 text-lg"
            >
              Try Free
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 px-8 py-6 text-lg"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See How It Works
            </Button>
          </div>
          
          <div className="mt-16 relative">
            <div className="aspect-video rounded-2xl bg-zinc-800/50 border border-zinc-700/50 overflow-hidden backdrop-blur-sm">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-zinc-700/50 mb-4">
                    <svg className="w-10 h-10 text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                    </svg>
                  </div>
                  <p className="text-zinc-500 text-sm">Demo video preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
