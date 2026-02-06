'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ArrowRight, Check, Loader2 } from 'lucide-react';

interface CheckoutButtonProps {
  buttonText?: string;
  className?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?: 'default' | 'outline' | 'ghost';
}

export function CheckoutButton({
  buttonText = 'Try Free',
  className = '',
  size = 'lg',
  variant = 'default',
}: CheckoutButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setIsLoading(false);
    }
  };

  const scrollToUpload = () => {
    setIsOpen(false);
    document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Button
        size={size}
        variant={variant}
        onClick={() => setIsOpen(true)}
        className={className}
      >
        {buttonText}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800">
          <DialogHeader>
            <DialogTitle className="text-white">Start Your Free Trial</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Enter your email to begin your 7-day free trial. No credit card required.
            </DialogDescription>
          </DialogHeader>

          {isSuccess ? (
            <div className="py-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
                <Check className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">You're all set!</h3>
              <p className="text-zinc-400 mb-6">Redirecting you to upload your first video...</p>
              <Button onClick={scrollToUpload} className="w-full">
                Upload Video Now
              </Button>
            </div>
          ) : (
            <form onSubmit={handleCheckout} className="space-y-4 py-4">
              <div>
                <label htmlFor="checkout-email" className="block text-sm font-medium text-zinc-300 mb-2">
                  Email Address
                </label>
                <Input
                  id="checkout-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Redirecting to Stripe...
                  </>
                ) : (
                  <>
                    Continue to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-zinc-500">
                You'll be redirected to Stripe to complete your subscription.
              </p>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
