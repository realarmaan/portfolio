import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Rubab AI — REALARMAAN',
    description: 'Rubab: A cognitive architecture for emergent machine consciousness. An exploration of artificial sentience by REALARMAAN.',
    openGraph: {
        title: 'Rubab AI — REALARMAAN',
        description: 'A cognitive architecture for emergent machine consciousness',
        images: ['/images/rubab_poster.webp'],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Rubab AI — REALARMAAN',
        description: 'A cognitive architecture for emergent machine consciousness',
        images: ['/images/rubab_poster.webp'],
    },
};

export default function RubabLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
