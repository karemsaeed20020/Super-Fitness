import AboutPage from '../about/page';
import ClassesPage from '../classes/page';
import HealthyPage from '../healthy/page';
import HeroSection from './components/hero-section';
import WhyUsSection from './components/why-us-section';

export default function HomePage() {
  return (
    <main className="relative grid w-full grid-cols-1">
      {/* Hero */}
      <HeroSection />

      {/* About */}
      <AboutPage />

      {/* Why Us */}
      <WhyUsSection />

      {/* Healthy */}
      <HealthyPage />

      {/* Classes */}
      <ClassesPage />
    </main>
  );
}
