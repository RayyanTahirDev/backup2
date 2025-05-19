import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import OrgDesignSection from "./components/OrgDesignSection";
import SkillsSection from "./components/SkillsSection";
import ContactSection from "./components/ContactSection";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function MarketingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <OrgDesignSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}