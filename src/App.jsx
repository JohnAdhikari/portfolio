import BackgroundSky from './components/effects/BackgroundSky';
import ClickEffect from './components/effects/ClickEffect';
import ScrollProgress from './components/effects/ScrollProgress';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Hobbies from './components/sections/Hobbies';
import Certifications from './components/sections/Certifications';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import useTheme from './hooks/useTheme';

export default function App() {
  const { mode, toggleMode } = useTheme();

  const navigate = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen font-body">
      <BackgroundSky />
      <ClickEffect />
      <ScrollProgress />

      <Navbar theme={mode} toggleTheme={toggleMode} />
      <main>
        <Hero onNavigate={navigate} />
        <About />
        <Skills />
        <Hobbies />
        <Certifications />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}