import './globals.css'
import {Providers} from './providers'

import type {Metadata, Viewport} from 'next'
import colors from 'tailwindcss/colors'

import {inter, karla} from '@/components/layout'

export const metadata: Metadata = {
    title: 'Places | HN',
    description: '🌏 Places around the world',
    robots: {index: false},
}

export const viewport: Viewport = {
    themeColor: colors.red[900],
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
                    <div className={`${inter.className} bg-accent px-4 pt-8 text-white sm:px-10`}>
                        <p className="text-2xl font-semibold">Places</p>
                        <p className="text-sm font-medium opacity-60">A list of the best places that I have encountered on my travels, curated by me.</p>
                    </div>
                    {children}
                </body>
            </Providers>
        </html>
    )
}
