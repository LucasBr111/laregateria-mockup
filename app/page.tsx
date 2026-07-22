'use client';
import { EditorialNavbar } from '@/components/editorial/EditorialNavbar';
import { EditorialHero } from '@/components/editorial/EditorialHero';
import { EditorialMarqueePromo } from '@/components/editorial/EditorialMarqueePromo';
import { EditorialQuote } from '@/components/editorial/EditorialQuote';
import { EditorialBentoCategories } from '@/components/editorial/EditorialBentoCategories';
import { Editorial3ItemShowcase } from '@/components/editorial/Editorial3ItemShowcase';
import { EditorialBrandHeritage } from '@/components/editorial/EditorialBrandHeritage';
import { EditorialTrustSection } from '@/components/editorial/EditorialTrustSection';
import { EditorialFeaturedCTA } from '@/components/editorial/EditorialFeaturedCTA';
import { EditorialNewsletter } from '@/components/editorial/EditorialNewsletter';
import { EditorialFooter } from '@/components/editorial/EditorialFooter';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-300">
      {/* Block 1: Navbar & Header */}
      <EditorialNavbar />

      {/* Block 2: Hero Editorial */}
      <EditorialHero />

      {/* Block 3: Animated Marquee Promo Bar (Below Hero) */}
      <EditorialMarqueePromo />

      {/* Block 4: Highlighted Quote / Manifesto */}
      <EditorialQuote />

      {/* Block 5: Bento Grid Categories (Mobile Responsive 2x2) */}
      <EditorialBentoCategories />

      {/* Block 6: 3-Item Featured Showcase (Reference Layout) */}
      <Editorial3ItemShowcase />

      {/* Block 7: Brand Heritage & Story */}
      <EditorialBrandHeritage />

      {/* Block 8: Trust Pillars in Cut-Corner Cards (3 top, 2 bottom in Mobile) */}
      <EditorialTrustSection />

      {/* Block 9: Featured Collection CTA */}
      <ScrollReveal>
        <EditorialFeaturedCTA />
      </ScrollReveal>

      {/* Block 10: Newsletter */}
      <ScrollReveal>
        <EditorialNewsletter />
      </ScrollReveal>

      {/* Block 11: Footer Editorial */}
      <EditorialFooter />
    </div>
  );
}
