"use client";

import Image from "next/image";
import { CreditCard, Send, ShieldCheck, Gift, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function GiftCardsPage() {
  const router = useRouter();
  const [cardType, setCardType] = useState<'physical' | 'egift'>('physical');
  const [amount, setAmount] = useState('€100');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [balanceCode, setBalanceCode] = useState("");
  const [balanceResult, setBalanceResult] = useState<{ balance: string; valid: boolean } | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  // Focus functionality
  const scrollToForm = (type: 'physical' | 'egift') => {
    setCardType(type);
    document.getElementById('customization-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          cardType,
          recipientEmail,
          message,
        }),
      });
      
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Failed to create checkout session:', data.error);
        alert('Failed to initiate payment. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!balanceCode) return;
    setIsVerifying(true);
    setVerifyError(null);
    setBalanceResult(null);
    try {
      const response = await fetch('/api/gift-cards/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: balanceCode }),
      });
      const data = await response.json();
      if (response.ok) {
        setBalanceResult({ balance: data.balance, valid: true });
      } else {
        setVerifyError(data.error || "Invalid gift card code.");
      }
    } catch (err) {
      setVerifyError("An error occurred during verification.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 lg:px-20 max-w-7xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-24"
        >
          <span className="text-tertiary font-bold tracking-[0.3em] uppercase text-xs mb-6 block">Regalo</span>
          <h1 className="text-5xl md:text-7xl font-headline text-primary mb-8 leading-tight">
            Share the <br/> Experience
          </h1>
          <p className="text-on-surface-variant font-body text-lg leading-relaxed">
            &quot;Regalo della Casa&quot; — A gift from our house to yours. Offer your loved ones the unforgettable taste of authentic Italian heritage.
          </p>
        </motion.div>

        {/* Card Types Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-40">
           {/* Physical Card */}
           <motion.div 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className={`group flex flex-col p-10 lg:p-16 border shadow-sm transition-all duration-700 relative overflow-hidden cursor-pointer ${cardType === 'physical' ? 'bg-surface border-primary ring-1 ring-primary' : 'bg-surface-container-lowest border-outline-variant/10 hover:shadow-2xl'}`}
             onClick={() => scrollToForm('physical')}
           >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 -translate-y-16 translate-x-16 rounded-full" />
              <div className="relative w-full aspect-video mb-12 overflow-hidden rounded-sm shadow-xl">
                 <Image 
                    src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=800&auto=format&fit=crop" 
                    alt="Physical Gift Card" 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                 />
                 <div className="absolute inset-0 bg-primary/20 backdrop-blur-[1px] flex items-center justify-center">
                    <div className="bg-white/10 backdrop-blur-md border border-white/30 p-8 text-center text-white">
                       <h3 className="font-headline text-2xl uppercase tracking-[0.3em]">La Trattoria</h3>
                       <p className="text-[10px] mt-2 tracking-[0.2em] font-bold">EST. 1984</p>
                    </div>
                 </div>
              </div>
              <div className="flex-grow">
                <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest mb-4 block underline underline-offset-4">Traditional</span>
                <h3 className="text-3xl font-headline text-primary mb-4">Physical Card</h3>
                <p className="text-on-surface-variant font-body text-sm mb-8 leading-relaxed italic">
                  Classic Gold Foil design. Includes a premium textured envelope and personalized handwritten note.
                </p>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); scrollToForm('physical'); }}
                className="w-full bg-primary text-on-primary py-6 font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-tertiary-fixed transition-all"
              >
                 Select Physical Card <ArrowRight size={14} />
              </button>
           </motion.div>

           {/* E-Gift Card */}
           <motion.div 
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className={`group flex flex-col p-10 lg:p-16 border shadow-sm transition-all duration-700 relative overflow-hidden cursor-pointer ${cardType === 'egift' ? 'bg-surface border-primary ring-1 ring-primary' : 'bg-surface-container-lowest border-outline-variant/10 hover:shadow-2xl'}`}
             onClick={() => scrollToForm('egift')}
           >
              <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary/5 -translate-y-16 translate-x-16 rounded-full" />
              <div className="relative w-full aspect-video mb-12 overflow-hidden rounded-sm shadow-xl bg-primary flex items-center justify-center">
                 <div className="text-center text-on-primary p-10">
                     <Gift size={48} className="mx-auto mb-6 text-tertiary opacity-40" strokeWidth={1} />
                     <h3 className="font-headline text-3xl tracking-[0.2em]">E-GIFT</h3>
                 </div>
              </div>
              <div className="flex-grow">
                <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest mb-4 block underline underline-offset-4">Modern</span>
                <h3 className="text-3xl font-headline text-primary mb-4">E-Gift Card</h3>
                <p className="text-on-surface-variant font-body text-sm mb-8 leading-relaxed italic">
                  Instant Delivery. Perfect for last-minute celebratory gestures. Delivered via secure digital vault immediately.
                </p>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); scrollToForm('egift'); }}
                className="w-full border border-primary text-primary py-6 font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-primary hover:text-on-primary transition-all"
              >
                 Select E-Gift Card <ArrowRight size={14} />
              </button>
           </motion.div>
        </div>

        {/* Customization Form */}
        <section id="customization-form" className="bg-surface p-10 lg:p-24 border border-outline-variant/20 shadow-sm max-w-5xl mx-auto mb-40 relative scroll-mt-32">
           <div className="absolute top-10 right-10 opacity-5 pointer-events-none">
             <CreditCard size={120} />
           </div>
           
           <div className="text-center mb-16 relative z-10">
             <span className="text-tertiary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Bespoke</span>
             <h3 className="text-4xl font-headline text-primary">Customize Your Gift</h3>
             <p className="text-on-surface-variant font-body mt-4">For {cardType === 'physical' ? 'a Physical Card' : 'an E-Gift Card'} delivery.</p>
           </div>

           <form className="space-y-16 relative z-10" onSubmit={handlePayment}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                 <div className="space-y-6">
                    <label className="text-[10px] font-bold text-tertiary uppercase tracking-widest block">Select Amount</label>
                    <div className="grid grid-cols-3 gap-4">
                       {["€50", "€100", "€250"].map((opt) => (
                          <button 
                            key={opt} 
                            type="button" 
                            onClick={() => setAmount(opt)}
                            className={`border py-4 font-headline transition-all rounded-sm ${amount === opt ? 'bg-primary text-on-primary border-primary shadow-lg' : 'border-outline-variant/30 text-on-surface hover:border-primary hover:text-primary'}`}
                          >
                             {opt}
                          </button>
                       ))}
                    </div>
                 </div>
                 <div className="relative group pt-6">
                    <input 
                      type="email" 
                      id="recipient"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      required={true}
                      className="w-full border-b border-outline-variant/30 py-4 bg-transparent outline-none focus:border-primary transition-all font-body text-lg placeholder:text-on-surface-variant/30 peer" 
                      placeholder=" " 
                    />
                    <label 
                      htmlFor="recipient"
                      className="absolute left-0 top-4 text-xs uppercase tracking-widest font-bold text-tertiary transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-on-surface-variant/50 peer-placeholder-shown:top-4 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-tertiary"
                    >
                      Recipient Email *
                    </label>
                 </div>
              </div>

              <div className="relative group">
                 <label className="text-[10px] font-bold text-tertiary uppercase tracking-widest block mb-4">Personal Message (Optional)</label>
                 <textarea 
                   value={message}
                   onChange={(e) => setMessage(e.target.value)}
                   className="w-full border border-outline-variant/10 p-8 bg-surface-container-low outline-none focus:border-primary transition-all font-body text-lg min-h-[120px] resize-none" 
                   placeholder="Buon Compleanno! Share your warm wishes..."
                 />
              </div>

              <div className="text-center">
                 <button 
                  type="submit" 
                  disabled={isLoading || !recipientEmail}
                  className="bg-primary text-on-primary px-16 py-8 font-bold uppercase tracking-[0.3em] text-xs flex items-center gap-4 mx-auto hover:bg-tertiary-fixed transition-all shadow-xl group disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                    {isLoading ? 'Processing...' : 'Continue to Payment'} 
                    {!isLoading && <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                 </button>
              </div>
           </form>
        </section>

        {/* Balance Check */}
        <div className="bg-surface-container-low p-12 lg:p-20 border border-outline-variant/10 text-center max-w-3xl mx-auto rounded-sm">
           <ShieldCheck size={32} className="mx-auto text-tertiary mb-6 opacity-40" />
           <h3 className="text-2xl font-headline text-primary mb-4">Check Your Balance</h3>
           <p className="text-on-surface-variant font-body mb-10 italic">Already have a La Trattoria card? Enter the serial number below to view your current standing.</p>
           
           <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="text" 
                value={balanceCode}
                onChange={(e) => setBalanceCode(e.target.value)}
                className="bg-surface border border-outline-variant/20 px-6 py-5 flex-grow outline-none focus:border-primary font-body tracking-[0.3em] uppercase text-sm" 
                placeholder="XXXX-XXXX-XXXX" 
              />
              <button 
                onClick={handleVerify}
                disabled={isVerifying || !balanceCode}
                className="bg-primary text-on-primary px-10 py-5 font-bold uppercase tracking-widest text-xs hover:bg-tertiary-fixed transition-all disabled:opacity-50"
              >
                 {isVerifying ? "Verifying..." : "Verify"}
              </button>
           </div>
           
           {balanceResult && (
             <div className="mt-8 p-6 bg-primary/5 border border-primary/20 animate-in fade-in slide-in-from-top-4">
               <p className="text-on-surface-variant font-body uppercase tracking-wider text-xs mb-2">Available Balance</p>
               <h4 className="text-4xl font-headline text-primary">{balanceResult.balance}</h4>
             </div>
           )}

           {verifyError && (
             <div className="mt-8 p-4 bg-error/5 border border-error/20">
               <p className="text-error font-body text-sm">{verifyError}</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
