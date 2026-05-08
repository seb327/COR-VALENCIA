import { LanguageProvider }     from '@/components/providers/LanguageProvider';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { SomaticCore }          from '@/components/canvas/SomaticCore';
import { CursorSpotlight }      from '@/components/atmosphere/CursorSpotlight';
import { NavBar }               from '@/components/nav/NavBar';
import { HeroSection }          from '@/components/sections/HeroSection';
import { EssenceSection }       from '@/components/sections/EssenceSection';
import { PracticeSection }      from '@/components/sections/PracticeSection';
import { LiveSection }          from '@/components/sections/LiveSection';
import { OfferingsSection }     from '@/components/sections/OfferingsSection';
import { TailoredSection }      from '@/components/sections/TailoredSection';
import { GallerySection }       from '@/components/sections/GallerySection';
import { VoiceSection }         from '@/components/sections/VoiceSection';
import { JoinSection }          from '@/components/sections/JoinSection';

export default function App() {
  return (
    <LanguageProvider>
      {/* Persistent rose-gold 3D Somatic Core — fixed behind everything */}
      <SomaticCore />
      {/* Soft cursor spotlight overlay */}
      <CursorSpotlight />
      {/* Bilingual fixed navigation */}
      <NavBar />
      {/* Lenis smooth scroll + GSAP ScrollTrigger sync */}
      <SmoothScrollProvider>
        <main className="relative z-0">
          <HeroSection />
          <EssenceSection />
          <PracticeSection />
          <LiveSection />
          <OfferingsSection />
          <TailoredSection />
          <GallerySection />
          <VoiceSection />
          <JoinSection />
        </main>
      </SmoothScrollProvider>
    </LanguageProvider>
  );
}
