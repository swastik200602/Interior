import ContactCtaSection from "./home/ContactCtaSection";
import HeroSection from "./home/HeroSection";
import ProjectsSection from "./home/ProjectsSection";
import useDocumentMeta from "../hooks/useDocumentMeta";

function HomePage() {
  useDocumentMeta(
    "Interior Haven | Interior Architecture & Design",
    "Thoughtful residential and commercial interiors where beauty, function, and everyday life come naturally together.",
  );
  return (
    <main>
      <HeroSection />
      <ProjectsSection />
      <ContactCtaSection />
    </main>
  );
}

export default HomePage;
