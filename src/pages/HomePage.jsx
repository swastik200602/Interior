import AboutSection from "./home/AboutSection";
import ContactCtaSection from "./home/ContactCtaSection";
import FaqSection from "./home/FaqSection";
import HeroSection from "./home/HeroSection";
import ProcessSection from "./home/ProcessSection";
import ProjectsSection from "./home/ProjectsSection";
import ServicesSection from "./home/ServicesSection";
import TestimonialsSection from "./home/TestimonialsSection";
import useDocumentMeta from "../hooks/useDocumentMeta";

function HomePage() {
  useDocumentMeta(
    "Interior Haven | Interior Architecture & Design",
    "Thoughtful residential and commercial interiors where beauty, function, and everyday life come naturally together.",
  );
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ProcessSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactCtaSection />
    </>
  );
}

export default HomePage;
