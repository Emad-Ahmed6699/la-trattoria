import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function GiftCardSuccessPage() {
  return (
    <div className="bg-background min-h-screen pt-40 pb-24 flex items-center justify-center">
      <div className="container mx-auto px-6 max-w-xl text-center">
        <CheckCircle size={80} className="text-primary mx-auto mb-8" />
        <span className="text-tertiary font-bold tracking-[0.3em] uppercase text-xs mb-6 block">Grazie</span>
        <h1 className="text-4xl md:text-5xl font-headline text-primary mb-6 leading-tight">
          Payment Successful
        </h1>
        <p className="text-on-surface-variant font-body text-lg leading-relaxed mb-12">
          Your gift card order has been received! The receipt and digital vault details (if ordered an E-Gift Card) have been sent to your email.
        </p>
        
        <Link 
          href="/" 
          className="inline-flex bg-primary text-on-primary px-10 py-5 font-bold uppercase tracking-widest text-xs items-center gap-3 hover:bg-tertiary-fixed transition-all"
        >
          Return Home <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
