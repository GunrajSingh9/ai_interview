import { PageWrapper } from "@/components/layout/page-wrapper"
import { HeroSection } from "@/components/landing/hero-section"
import { FeatureGrid } from "@/components/landing/feature-grid"
import { TechStackMarquee } from "@/components/landing/tech-stack-marquee"

export function LandingPage() {
  return (
    <PageWrapper>
      <HeroSection />
      <FeatureGrid />
      <TechStackMarquee />
    </PageWrapper>
  )
}
