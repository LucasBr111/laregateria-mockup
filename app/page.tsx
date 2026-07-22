'use client';
import { EditorialNavbar } from '@/components/editorial/EditorialNavbar';
import { EditorialHero } from '@/components/editorial/EditorialHero';
import { EditorialMarqueePromo } from '@/components/editorial/EditorialMarqueePromo';
import { EditorialQuote } from '@/components/editorial/EditorialQuote';
import { EditorialBentoCategories } from '@/components/editorial/EditorialBentoCategories';
import { EditorialCarousel } from '@/components/editorial/EditorialCarousel';
import { EditorialBrandHeritage } from '@/components/editorial/EditorialBrandHeritage';
import { EditorialTrustSection } from '@/components/editorial/EditorialTrustSection';
import { EditorialFeaturedCTA } from '@/components/editorial/EditorialFeaturedCTA';
import { EditorialNewsletter } from '@/components/editorial/EditorialNewsletter';
import { EditorialFooter } from '@/components/editorial/EditorialFooter';

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-300">
      {/* Navbar & Header */}
      <EditorialNavbar />

      {/* Hero Editorial */}
      <EditorialHero />

      {/* Animated Marquee Promo Bar (Moved below Hero) */}
      <EditorialMarqueePromo />

      {/* Highlighted Quote / Manifesto */}
      <EditorialQuote />

      {/* Bento Grid Categories (Mobile-friendly) */}
      <EditorialBentoCategories />

      {/* Best Products Carousel */}
      <EditorialCarousel />

      {/* Brand Heritage & Story */}
      <EditorialBrandHeritage />

      {/* Trust Pillars in Cut-Corner Cards */}
      <EditorialTrustSection />

      {/* Featured Collection CTA */}
      <EditorialFeaturedCTA />

      {/* Newsletter */}
      <EditorialNewsletter />

      {/* Footer Editorial */}
      <EditorialFooter />
    </div>
  );
}
