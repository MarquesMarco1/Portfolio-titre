import dynamic from 'next/dynamic';
import Header from './components/Header';
import Presentation from './components/Presentation';

// Lazy loading des composants below the fold pour améliorer les performances
const About = dynamic(() => import('./components/About'), {
  loading: () => null,
});

const Skills = dynamic(() => import('./components/Skills'), {
  loading: () => null,
});

const Projects = dynamic(() => import('./components/Projects'), {
  loading: () => null,
});

const CV = dynamic(() => import('./components/CV'), {
  loading: () => null,
});

const Contact = dynamic(() => import('./components/Contact'), {
  loading: () => null,
});

const Footer = dynamic(() => import('./components/Footer'), {
  loading: () => null,
});

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Presentation />
      <About />
      <Skills />
      <Projects />
      <CV />
      <Contact />
      <Footer />
    </main>
  );
} 