import './globals.css'
import {Providers} from './providers'

import type {Metadata} from 'next'

import {PageHeader, PageSection, karla} from '@/components/layout'

export const metadata: Metadata = {
    title: 'Places | HN',
    description: '🌏 Places around the world',
    robots: {index: false},
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <Providers>
                <body className={`${karla.className} flex min-h-screen w-full flex-col bg-layer-0 text-black antialiased dark:bg-layer-0-dark dark:text-white`}>
                    <PageSection>
                        <PageHeader title="Places" subtitle="A list of the best places that I have encountered on my travels. These are the special ones that I've curated." />
                    </PageSection>
                    {children}
                </body>
            </Providers>
        </html>
    )
}
