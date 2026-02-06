import { Card, CardContent } from '@/components/ui/card';
import { Zap, Video, Clock, Trophy } from 'lucide-react';

const features = [
  {
    name: 'AI Highlight Detection',
    description: 'Automatically identifies the best rallies, aces, and winners from your match footage.',
    icon: Zap,
  },
  {
    name: '4K Export Quality',
    description: 'Export your highlights in stunning 4K resolution. Crystal clear for any platform.',
    icon: Video,
  },
  {
    name: 'Seconds, Not Hours',
    description: 'Get your edited highlights in minutes. No more manual scrubbing through hours of footage.',
    icon: Clock,
  },
  {
    name: 'Match Statistics',
    description: 'Get detailed match stats including shot placement, rally length, and player performance.',
    icon: Trophy,
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-zinc-950">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need for perfect highlights
          </h2>
          <p className="mt-6 text-lg leading-8 text-zinc-400">
            RallyCut uses advanced AI to find your best moments and present them beautifully.
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {features.map((feature) => (
            <Card key={feature.name} className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-600/20 p-3">
                    <feature.icon className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{feature.name}</h3>
                    <p className="mt-2 text-zinc-400">{feature.description}</p>
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
