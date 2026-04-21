import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Trust from './components/Trust';
import Jobs from './components/Jobs';
import Team from './components/Team';
import CredentialGallery from './components/CredentialGallery';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import { Footer, WhatsAppButton } from './components/FooterLayout';

function App() {
  return (
    <div className="min-h-screen bg-off-white">
      <Navbar />
      <main>
        <Hero />
        <Trust />
        <About />
        <Team />
        <CredentialGallery />
        <Gallery />
        <Services />
        <Jobs />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
