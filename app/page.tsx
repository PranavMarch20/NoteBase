import Features from "@/components/features";
import { HeroHeader } from "@/components/header";
import HeroSection from "@/components/hero-section";
import CallToAction from "@/components/call-to-action";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div>
      <HeroHeader />
      <HeroSection />
      <Features />
      <CallToAction />
      <Footer />
    </div>
  );
}
