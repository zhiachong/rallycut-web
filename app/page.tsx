'use client';

import { useState } from 'react';
import { Hero } from '@/components/hero';
import { Features } from '@/components/features';
import { Pricing } from '@/components/pricing';
import { UploadForm } from '@/components/upload-form';
import { FAQ } from '@/components/faq';
import { Footer } from '@/components/footer';

export default function Home() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async () => {
    try {
      // Redirect to Stripe checkout
      const email = prompt('Enter your email to start your free trial:');
      
      if (!email) return;

      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950">
      <Hero onGetStarted={handleSubscribe} />
      <Features />
      <Pricing onSubscribe={handleSubscribe} />
      <UploadForm isSubscribed={isSubscribed} onSubscribe={handleSubscribe} />
      <FAQ />
      <Footer />
    </main>
  );
}
