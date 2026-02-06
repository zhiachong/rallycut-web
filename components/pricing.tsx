'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface PricingProps {
  onSubscribe: () => void;
}

const features = [
  'Unlimited highlight generation',
  '4K video export',
  'Advanced AI detection',
  'Match statistics dashboard',
  'Priority processing',
  'Email support',
];

export function Pricing({ onSubscribe }: PricingProps) {
  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-zinc-950 to-zinc-900">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-zinc-400">
            One plan. All features. No hidden fees.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-md">
          <Card className="relative overflow-hidden border-2 border-green-500/50 bg-zinc-900">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-green-500 to-emerald-600" />
            
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-white">RallyCut Pro</CardTitle>
              <CardDescription className="text-zinc-400">Perfect for serious players</CardDescription>
              <div className="mt-6 flex items-baseline justify-center gap-x-2">
                <span className="text-5xl font-bold tracking-tight text-white">$99</span>
                <span className="text-lg text-zinc-400">/year</span>
              </div>
              <p className="mt-2 text-sm text-green-400">7-day free trial included</p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <ul className="space-y-4">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
                    <span className="text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                size="lg"
                onClick={onSubscribe}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 py-6 text-lg font-semibold"
              >
                Try Free for 7 Days
              </Button>
              
              <p className="text-center text-xs text-zinc-500">
                Cancel anytime. No credit card required for trial.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
