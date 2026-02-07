'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useState } from 'react';

interface PricingProps {
  onSubscribe: () => void;
}

const features = [
  '4K video export',
  'Unlimited highlight generation',
  'Fast processing (24-48 hours)',
  'Email support',
  'Share highlights instantly',
  'Mobile-friendly player',
];

export function Pricing({ onSubscribe }: PricingProps) {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-zinc-950 to-zinc-900">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Simple Pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-zinc-400">
            One plan. All features. Choose how you pay.
          </p>
        </div>
        
        <div className="mx-auto mt-12 max-w-lg">
          {/* Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-900 p-1">
              <button
                onClick={() => setIsAnnual(false)}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-colors ${
                  !isAnnual 
                    ? 'bg-green-500 text-white' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-colors ${
                  isAnnual 
                    ? 'bg-green-500 text-white' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Annual
              </button>
            </div>
          </div>

          {/* Single Plan Card */}
          <Card className="relative overflow-hidden border border-zinc-700 bg-zinc-900">
            {isAnnual && (
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-green-500 to-emerald-600" />
            )}
            
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-white">RallyCut Pro</CardTitle>
              <CardDescription className="text-zinc-400">Everything you need</CardDescription>
              <div className="mt-6 flex items-baseline justify-center gap-x-2">
                <span className="text-5xl font-bold tracking-tight text-white">
                  {isAnnual ? '$100' : '$15'}
                </span>
                <span className="text-lg text-zinc-400">{isAnnual ? '/year' : '/month'}</span>
              </div>
              {isAnnual ? (
                <div className="mt-2 flex items-center justify-center gap-2">
                  <span className="text-sm text-green-400">Save $80/year</span>
                  <span className="text-xs text-zinc-500 line-through">$180/year</span>
                </div>
              ) : (
                <p className="mt-2 text-sm text-zinc-400">No commitment</p>
              )}
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
                Start Free Trial
              </Button>
              
              <p className="text-center text-sm text-green-400">
                7-day free trial. No credit card required.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
