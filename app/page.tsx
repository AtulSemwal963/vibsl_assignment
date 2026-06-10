import Hero from "./components/sections/Hero";
import LogoCloud from "./components/sections/LogoCloud";
import FeaturesGrid from "./components/sections/FeaturesGrid";
import TestimonialQuote from "./components/sections/TestimonialQuote";
import TabbedFeatures from "./components/sections/TabbedFeatures";
import SecurityPillars from "./components/sections/SecurityPillars";
import Pricing from "./components/sections/Pricing";
import TestimonialsGrid from "./components/sections/TestimonialsGrid";
import FAQ from "./components/sections/FAQ";
import CTA from "./components/sections/CTA";


export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Hero />
      <LogoCloud />
      <FeaturesGrid />
      <TestimonialQuote />
      <TabbedFeatures />
      <SecurityPillars />
      <Pricing />
      <TestimonialsGrid />
      <FAQ />
      <CTA />
    </div>
  );
}
