import HeroSection from './components/HeroSection';
import MenuPreview from './components/MenuPreview';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import ThemeProvider from './components/providers/ThemeProvider';

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <main className="relative min-h-screen">
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-gray-900 via-[#0c0a0f] to-black">
          {/* Geometric Pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M0 50L50 0" stroke="currentColor" strokeWidth="0.5" className="text-white" fill="none" />
                </pattern>
              </defs>
              <rect className="text-white" fill="url(#grid)" />
            </svg>
          </div>

          {/* Ambient Glows */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }} />
          <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '6s' }} />
        </div>

        {/* Hero Section */}
        <HeroSection />

        {/* Menu Preview Section */}
        <MenuPreview />

        {/* About Section */}
        <AboutSection />

        {/* Footer */}
        <Footer />
      </main>
    </ThemeProvider>
  );
}