import { Hero } from '@/components/landing/Hero';
import { PainPoints } from '@/components/landing/PainPoints';
import { ValueProposition } from '@/components/landing/ValueProposition';
import { TechTabs } from '@/components/landing/TechTabs';
import { Features } from '@/components/landing/Features';
import { ConsultationForm } from '@/components/landing/ConsultationForm';
import { CTA } from '@/components/landing/CTA';
import { MobileStickyCTA } from '@/components/layout/MobileStickyCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <PainPoints />
      <ValueProposition />
      <TechTabs />
      <Features />
      <ConsultationForm />
      <CTA />
      <MobileStickyCTA />
    </>
  );
}
