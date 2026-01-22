'use client';

import { useState } from 'react';
import Header from '../components/Header';
import RubabHero from '../components/RubabHero';
import RubabDetails from '../components/RubabDetails';
import ResearchModal from '../components/ResearchModal';
import Footer from '../components/Footer';

export default function RubabPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <main>
                <RubabHero onOpenModal={() => setIsModalOpen(true)} />
                <RubabDetails onOpenModal={() => setIsModalOpen(true)} />
            </main>

            <ResearchModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            <Footer />
        </>
    );
}
