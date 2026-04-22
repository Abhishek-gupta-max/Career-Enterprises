import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import Trust from '../components/Trust';
import About from '../components/About';
import Team from '../components/Team';
import CredentialGallery from '../components/CredentialGallery';
import Gallery from '../components/Gallery';
import Services from '../components/Services';
import FeaturedJobs from '../components/sections/FeaturedJobs';
import Testimonials from '../components/Testimonials';
import Contact from '../components/sections/Contact';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Career Enterprises | Elite Global Recruitment & Overseas Jobs</title>
        <meta name="description" content="Career Enterprises — MEA licensed overseas recruitment agency. Find jobs in UAE, Qatar, Saudi Arabia, Kuwait & Oman. Government approved, 1000+ candidates placed." />
        <meta property="og:title" content="Career Enterprises | Elite Global Recruitment" />
        <meta property="og:description" content="MEA-licensed overseas recruitment agency. Connecting Indian talent with premium global employers." />
        <meta property="og:type" content="website" />
      </Helmet>
      <main>
        <Hero />
        <Trust />
        <About />
        <Team />
        <CredentialGallery />
        <Gallery />
        <Services />
        <FeaturedJobs />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}
