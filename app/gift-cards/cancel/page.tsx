import Link from 'next/link';
import { XCircle, ArrowLeft } from 'lucide-react';

export default function GiftCardCancelPage() {
  return (
    <div className="bg-background min-h-screen pt-40 pb-24 flex items-center justify-center">
      <div className="container mx-auto px-6 max-w-xl text-center">
        <XCircle size={80} className="text-error mx-auto mb-8" />
        <h1 className="text-4xl md:text-5xl font-headline text-error mb-6 leading-tight">
          Payment Canceled
        </h1>
        <p className="text-on-surface-variant font-body text-lg leading-relaxed mb-12">
          Your gift card order wasn't completed. You can try again whenever you are ready.
        </p>
        
        <Link 
          href="/gift-cards" 
          className="inline-flex border border-primary text-primary px-10 py-5 font-bold uppercase tracking-widest text-xs items-center gap-3 hover:bg-primary hover:text-on-primary transition-all"
        >
          <ArrowLeft size={14} /> Try Again
        </Link>
      </div>
    </div>
  );
}
