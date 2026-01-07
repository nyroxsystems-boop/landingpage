import { Hero } from '@/components/landing/Hero';
import { PainPoints } from '@/components/landing/PainPoints';
import { TechTabs } from '@/components/landing/TechTabs';
import { Features } from '@/components/landing/Features';
import { Pricing } from '@/components/landing/Pricing';
import { CTA } from '@/components/landing/CTA';
import { MobileStickyCTA } from '@/components/layout/MobileStickyCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <PainPoints />
      <TechTabs />
      <Features />
      <Pricing />
      <CTA />
      <MobileStickyCTA />
    </>
  );
}

