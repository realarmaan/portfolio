'use client';

import { useState } from 'react';
import Header from './components/Header';
import HomeHero from './components/HomeHero';
import { HomeAbout, HomeHSV, HomeProjects, HomeResearch, HomeCollaborate } from './components/HomeSections';
import OwnerCard from './components/OwnerCard';
import ResearchModal from './components/ResearchModal';
import Footer from './components/Footer';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main style={{ backgroundColor: '#33434c', color: '#fff' }}>
      <Header />

      <HomeHero onOpenResearch={() => setIsModalOpen(true)} />

      <div style={{ position: 'relative', zIndex: 20 }}>
        {/* Responsive Layout with OwnerCard */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{ flex: '1 1 60%', minWidth: '300px' }}>
            <HomeAbout />
            <HomeHSV />
            <HomeProjects />
            <HomeResearch onOpenResearch={() => setIsModalOpen(true)} />
            <HomeCollaborate />
          </div>

          <div style={{
            flex: '0 0 300px',
            padding: '2rem',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <OwnerCard />
          </div>
        </div>
      </div>

      <ResearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <Footer />
    </main>
  );
}
