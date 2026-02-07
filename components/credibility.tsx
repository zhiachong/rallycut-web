'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Target, Zap } from 'lucide-react';

const credentials = [
  {
    icon: Trophy,
    title: 'Built by Tennis Players',
    description: 'We play tennis. We know the grind. Building the app we wanted to use.',
  },
  {
    icon: Target,
    title: 'For Serious Tennis Players',
    description: 'Whether you\'re working on your game, tracking progress, or sharing with friends—RallyCut is designed for you.',
  },
  {
    icon: Zap,
    title: 'Real-World Tested',
    description: 'Built and tested with actual match footage. We know tennis. We know what a good highlight reel looks like.',
  },
];

export function Credibility() {
  return (
    <section className="py-24 bg-zinc-950">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Built by Tennis Players, for Tennis Players
          </h2>
          <p className="mt-6 text-lg leading-8 text-zinc-400">
            We play at 5.0. We know the grind. We built what we wanted to use.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
          {credentials.map((cred) => (
            <Card key={cred.title} className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex flex-col items-start gap-4">
                  <div className="rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-600/20 p-3">
                    <cred.icon className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{cred.title}</h3>
                    <p className="mt-2 text-zinc-400">{cred.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
