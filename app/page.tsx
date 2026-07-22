'use client';
import { EditorialNavbar } from '@/components/editorial/EditorialNavbar';
import { EditorialHero } from '@/components/editorial/EditorialHero';
import { EditorialQuote } from '@/components/editorial/EditorialQuote';
import { EditorialBentoCategories } from '@/components/editorial/EditorialBentoCategories';
import { EditorialBrandHeritage } from '@/components/editorial/EditorialBrandHeritage';
import { EditorialTrustSection } from '@/components/editorial/EditorialTrustSection';
import { EditorialFeaturedCTA } from '@/components/editorial/EditorialFeaturedCTA';
import { EditorialNewsletter } from '@/components/editorial/EditorialNewsletter';
import { EditorialFooter } from '@/components/editorial/EditorialFooter';

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-300">
      {/* Block 1: PromoBar + Navbar */}
      <EditorialNavbar />

      {/* Block 2: Hero Editorial */}
      <EditorialHero />

      {/* Block 3: Highlighted Quote */}
      <EditorialQuote />

      {/* Block 4: Bento Categories */}
      <EditorialBentoCategories />

      {/* Block 5: Brand Heritage */}
      <EditorialBrandHeritage />

      {/* Block 6: Trust Section */}
      <EditorialTrustSection />

      {/* Block 7: Featured Collection CTA */}
      <EditorialFeaturedCTA />

      {/* Block 8: Newsletter */}
      <EditorialNewsletter />

      {/* Block 9: Footer Editorial */}
      <EditorialFooter />
    </div>
  );
}
