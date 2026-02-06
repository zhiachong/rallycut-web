'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    question: "How does RallyCut work?",
    answer: "Simply upload your tennis match video, and our AI will automatically detect the best rallies, aces, and winners. You'll get a professionally edited highlight reel in minutes, not hours."
  },
  {
    question: "What video formats are supported?",
    answer: "We support all major video formats including MP4, MOV, AVI, and MKV. Files up to 10GB can be uploaded for processing."
  },
  {
    question: "How long does processing take?",
    answer: "Most videos are processed within 5-10 minutes depending on length. A 2-hour match typically takes about 8 minutes to generate highlights."
  },
  {
    question: "Can I export in 4K?",
    answer: "Yes! If your source video is 4K, we can export highlights in full 4K resolution. We also support 1080p and 720p exports."
  },
  {
    question: "What's included in the free trial?",
    answer: "The 7-day free trial includes unlimited highlight generation, 4K exports, and full access to all features. No credit card required to start."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Absolutely. You can cancel your subscription at any time with no penalties. You'll continue to have access until the end of your billing period."
  }
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-zinc-950">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Everything you need to know about RallyCut
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-zinc-800">
              <AccordionTrigger className="text-left text-white hover:text-green-400 hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-zinc-400 leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
