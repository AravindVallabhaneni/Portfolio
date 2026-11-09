import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SideProgressRail } from './components/layout/SideProgressRail';
import { Preloader } from './components/layout/Preloader';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { ProjectsSection } from './components/sections/Projects';
import { CurrentlyBuilding } from './components/sections/CurrentlyBuilding';
import { Skills } from './components/sections/Skills';
import { LeetCodeSection } from './components/sections/LeetCodeSection';
import { Certifications } from './components/sections/Certifications';
import { Education } from './components/sections/Education';
import { Contact } from './components/sections/Contact';
import { useScrollSpy } from './hooks/useScrollSpy';

export function App() {
  const { activeSection, scrollProgress, scrollToSection } = useScrollSpy();

  const handleExploreClick = () => {
    scrollToSection('projects');
  };

  const handleContactClick = () => {
    scrollToSection('contact');
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text selection:bg-accent-blue/20 selection:text-accent-cyan">
      {/* Session Preloader Intro */}
      <Preloader onComplete={() => {}} />

      {/* Sticky Top Navigation */}
      <Navbar activeSection={activeSection} onNavigate={scrollToSection} />

      {/* Vertical Side Progress Rail */}
      <SideProgressRail
        activeSection={activeSection}
        scrollProgress={scrollProgress}
        onNavigate={scrollToSection}
      />

      {/* Main Page Layout */}
      <main className="flex-1 w-full">
        {/* 1. Hero Section */}
        <Hero onExploreClick={handleExploreClick} onContactClick={handleContactClick} />

        {/* 2. About Me */}
        <About />

        {/* 3. Featured Projects (Explore & 3D Interactive Deck) */}
        <ProjectsSection />

        {/* 4. Currently Building (Live Workbench) */}
        <CurrentlyBuilding />

        {/* 5. Skills & Capabilities */}
        <Skills />

        {/* 6. Live LeetCode Progress & Heatmap */}
        <LeetCodeSection />

        {/* 7. Certifications & Credentials */}
        <Certifications />

        {/* 8. Education & Achievements */}
        <Education />

        {/* 9. Contact & Inquiries */}
        <Contact />
      </main>

      {/* Editorial Footer */}
      <Footer onBackToTop={handleBackToTop} />
    </div>
  );
}

export default App;
