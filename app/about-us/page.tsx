"use client";
import Newsletter from "@/components/Newsletter";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="bg-background">
      {/* Hero Section */}
      <header className="relative min-h-[70vh] flex items-center pt-32 overflow-hidden">
        <div className="container mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:col-span-7 z-10"
          >
            <span className="text-tertiary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Est. 1994</span>
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-8">Crafting Memories <br /><span className="text-primary italic">Through Soil & Soul</span></h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-xl leading-relaxed font-body">A sanctuary for the senses in the heart of the city, where ancient Italian traditions meet modern culinary innovation.</p>
          </motion.div>
          <div className="md:col-span-5 relative">
            <div className="aspect-[4/5] bg-surface-container overflow-hidden rounded-sm relative">
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOfd6TpncK_sgmB7L4ESPlKVb14EYRWi8mypzIvidzIQaawQ-BA4FxQA4NsI1wEhAVylmbf8x7KHOywMZzjU4QtFb3cuDmAoCMzM_tI13-Zu2wG0DEvetUccsm-4Y_0gnVHLTJqO3q6VPrOpjFoeIp39tQiCHCo2OnCz4soR85kzpuXdBxjd5yZYK-BPIh0-jCIcyGkSsGmX_pVzuRd3QgXbmag49e-SkAWO-NCLyhOWbFc-Md-lNl25sIQc-0icA0IFwCUSuQBww"
                alt="About Hero"
              />
              <div className="absolute inset-0 bg-primary/5 mix-blend-multiply"></div>
            </div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-tertiary-container rounded-sm flex items-center justify-center p-8 hidden lg:flex shadow-lg">
              <p className="font-headline text-on-tertiary-container text-center text-sm font-medium">Named "Best Italian Kitchen" five years running.</p>
            </div>
          </div>
        </div>
      </header>

      {/* The Story Section */}
      <section className="py-32 bg-surface-container-low">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 md:order-1 relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <img className="w-full aspect-square object-cover rounded-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7PPZafqZdz1c5RQCUPNu9SeZbDuPbvzEgAFsJXcMEFuwesS1lwhvcLdWvH9iiECPzM_H4rfj5-S4jKPJ-nL7Mf01cOvPFpUXIm4rdoIgDscl6N47iHyE6yV3qvYFPgvKosBtyTnpEj_g4smNVpPwD3N0jPh9kXIckVaKqperomMRWyTnic7ikStAE7F39N5TjszpMgiDxUPeXeCYW4Hy5Zn_EebBxDhQBcM9ut_g6-ZNLoz5AVTK_OBBQ42KqLDUxmmYG8O8wBsA" alt="Artisanal pasta" />
                  <img className="w-full aspect-[3/4] object-cover rounded-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDi8s124wvXA6KLKaIffgXuo5AedIn63xXp93mVA8qUk8BhKNjD4JEw0nKMpBeFkVywoJngP-KIcjQoJbPymQ6SQb2dBGiaNtX6oKkAIYB3ArxK0IaxDGckApiGKMeofRp_XiToGhXNB5HnPz4FUzVlFVDJrvpfJzw6zOnpMECceSjGMOKguKyfQejHR3msc-VVUAszxaAmxZ3hcCWh_mbNpOjWRQkpb19TxtDVsk9Bkejdx6Stm_oc4v7rHUX7vRI2oKQ9pMY2Szg" alt="Dining room" />
                </div>
                <div className="space-y-4">
                  <img className="w-full aspect-[3/4] object-cover rounded-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1HJ6vRZPg3G6Ebjo7b5Ct_cTpW3De-oeDYb7o0npW1HrFlEP2lrWFljb398t7RNzyIYII1PYVyzmrqLp_BeR4nZThGc9WfAX4s42CIpM6Ta-Rcq-q6kynERJaqEJfXZdScR1i632bzRN8fXcsmCuTS0F6m-dCb6wmQZIwpE8UVfhlYAzJJzL2HnKAeYHuMfu5arOmvM1BRFBu-PFIo6ayLp4agnopVbZz4y93OKT9AgvpmfbZoljY4YdxYTFiwdHVl41fl7odEck" alt="Wine cellar" />
                  <img className="w-full aspect-square object-cover rounded-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7NOl_kDCDseje65sQFnLqGCwU9wK1VrCUNCh-4MeeRPQRCESVTaFSy1RDdGq-HAR2N-OMs50Yd2NvgJ0CZmRwR-L9wjCMreqll9-mp7sDj9NXc6BE-gxfVQBKfGmoSoWfqIaMCPYWd0yfD0wzrh-9jKEO7EhD-EZ7N0ng9PGuZO0jGB8VO5lpQeJs8kyOgmKmlIx511wAh3Y4L2o4KJ8oCN3zZPR2ThZaHDjeBq_1XwlRRPRsPhU4Uk7AJVxvo_1n6d760EssAp4" alt="Ingredients" />
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 md:order-2"
            >
              <h2 className="font-headline text-4xl md:text-5xl mb-8">A Legacy Rooted in <span className="text-secondary italic">Authenticity</span></h2>
              <div className="space-y-6 text-on-surface-variant leading-loose font-body">
                <p>La Trattoria began as a vision to bring the quiet luxury of the Tuscan countryside to our neighborhood. Founded by the Rossi family, it was never just about the food—it was about the art of the long lunch, the shared bottle of Chianti, and the reverence for seasonal ingredients.</p>
                <p>Our kitchen is a dialogue between the past and the present. We use 100-year-old sourdough starters for our focaccia and hand-rolled pasta techniques passed down through generations, yet we plate with the precision of a modern atelier.</p>
                <p>We believe that luxury is found in the details: the weight of the silver, the warmth of the lighting, and the honesty of the flavors on the plate.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Chef Section */}
      <section className="py-32 bg-surface overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-stretch">
            <div className="lg:w-1/3 bg-primary p-12 flex flex-col justify-between text-on-primary rounded-sm relative">
              <div className="absolute top-0 right-0 p-8 opacity-20">
                <span className="material-symbols-outlined text-8xl material-fill">restaurant_menu</span>
              </div>
              <div>
                <h3 className="font-headline text-3xl mb-2">Chef Marco D'Angelo</h3>
                <p className="font-bold tracking-widest text-secondary-container text-xs uppercase mb-8 font-label">Executive Chef & Partner</p>
                <p className="text-sm leading-relaxed opacity-90 italic font-body">"The ingredient is the master; I am merely its translator. We don't change nature; we elevate it through technique and time."</p>
              </div>
              <div className="pt-12">
                <div className="flex gap-4">
                  <div className="w-12 h-0.5 bg-secondary-container mt-3"></div>
                  <p className="text-xs uppercase tracking-widest font-label font-bold">Two Michelin Stars <br /> James Beard Finalist</p>
                </div>
              </div>
            </div>
            <div className="lg:w-2/3 grid md:grid-cols-2 gap-12">
              <div className="space-y-8 flex flex-col justify-center">
                <h4 className="font-headline text-2xl">The Visionary</h4>
                <p className="text-on-surface-variant leading-relaxed font-body">Trained in the heart of Modena and refined in the kitchens of Paris, Chef Marco brings a surgical precision to the rustic soul of La Trattoria. His philosophy centers on the 'Zero Kilometer' initiative, sourcing 90% of our produce from local family farms within a morning's drive.</p>
                <div className="pt-4 space-y-4">
                  <div className="flex items-center gap-4 group text-on-surface">
                    <span className="material-symbols-outlined text-tertiary material-fill">verified</span>
                    <span className="text-sm font-bold tracking-tight font-label">Sustainable Gastronomy Award 2023</span>
                  </div>
                  <div className="flex items-center gap-4 group text-on-surface">
                    <span className="material-symbols-outlined text-tertiary material-fill">verified</span>
                    <span className="text-sm font-bold tracking-tight font-label">Master of Modern Italian Cuisine</span>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <img className="w-full h-full object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyq61Yzh-S_I8Caz9zU9kGyhM2hByE95SZmzZasIoinHgIlgeNWXoF_PIgL96T94zw96GDdoabuVTqsPJ1C9lDFtnDeffyAgSPvgBbgZap4qVvJw57hovDTkI_NB_fVUsR5MG4R2f0Qfy4dPS_tVFaY2fXjulnOroRroF816xB3PteuXonz3phXvyKvpQVzAiRQK7Nn0gR1prFsa6yN8lpnv1pEATPlU87Tn0_JkE2KEXI48w1gudKV8KZupFB2f3--p1-jK0gkEY" alt="Chef Marco" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section (Bento Style) */}
      <section className="py-32 bg-surface-container">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-headline text-4xl md:text-5xl mb-4 text-on-surface">Our Culinary Philosophy</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]"
          >
            {/* Bento Item 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="md:col-span-1 md:row-span-2 bg-surface p-10 flex flex-col justify-end group border-l-4 border-primary shadow-sm"
            >
              <span className="material-symbols-outlined text-primary mb-6 text-4xl material-fill">eco</span>
              <h5 className="font-headline text-2xl mb-4 text-on-surface">The Earth First</h5>
              <p className="text-sm text-on-surface-variant leading-relaxed font-body">Our menu breathes with the seasons. We follow the rhythm of the soil, ensuring that every plate reflects the true essence of the harvest.</p>
            </motion.div>
            {/* Bento Item 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="md:col-span-2 bg-primary text-on-primary p-10 flex items-center gap-12 overflow-hidden relative shadow-sm"
            >
              <div className="w-1/2 relative z-10">
                <h5 className="font-headline text-2xl mb-4">Heritage Reimagined</h5>
                <p className="text-sm opacity-80 leading-relaxed font-body">While we honor the recipes of our ancestors, we are not afraid of progress. We use molecular techniques to enhance texture while preserving the soul of the flavor.</p>
              </div>
              <div className="w-1/2 absolute -right-10 top-0 bottom-0 rotate-12 scale-110 opacity-40">
                <img className="w-full h-full object-cover rounded-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGxaW8A6FT5Vf7SsY-ORnGzYi_XcZEvNLcXDViuU6UKIYsz-5hFaqpOAvaXIpf9KMjK_Va7IPiG9-TiRFgKHCGMB83OC-sDHV4gTFSF1ReppJInYA8jCF-nd_Lx58g7XkKs81zr27XwxR1LA0eyOIIxjd3kjndt120rRv_CQ4qWsV6I7Lzqo9zPSMSx002v86GQlLQME_LqokShYC1SatGcn-ODwubOz62cRNj56zrF8YbynQgYthp9TGLllhl1v232plv9MzZlh4" alt="Heritage" />
              </div>
            </motion.div>
            {/* Bento Item 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-surface-container-highest p-10 flex flex-col justify-center shadow-sm"
            >
              <h5 className="font-headline text-xl mb-3 text-on-surface">Slow Food</h5>
              <p className="text-xs text-on-surface-variant uppercase tracking-widest font-bold mb-4 font-label">The Art of Patience</p>
              <p className="text-sm text-on-surface-variant leading-relaxed font-body">Time is our most precious ingredient. From 48-hour dough ferments to slow-simmered ragu, we never rush the process.</p>
            </motion.div>
            {/* Bento Item 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-tertiary-fixed p-10 flex flex-col justify-center text-on-tertiary-fixed-variant shadow-sm"
            >
              <span className="material-symbols-outlined mb-4 text-3xl">wine_bar</span>
              <h5 className="font-headline text-xl mb-2">Curation</h5>
              <p className="text-sm leading-relaxed font-body">A cellar of 400+ vintages, curated specifically to elevate the nuances of our regional cuisine.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Newsletter />
    </main>
  );
}
