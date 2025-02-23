import './globals.css'
import {Providers} from './providers'

import type {Metadata, Viewport} from 'next'
import colors from 'tailwindcss/colors'

import {karla} from '@/components/layout'

export const metadata: Metadata = {
    title: 'Places | HN',
    description: '🌏 Places around the world',
    robots: {index: false},
}

export const viewport: Viewport = {
    themeColor: [
        {media: '(prefers-color-scheme: light)', color: colors.white},
        {media: '(prefers-color-scheme: dark)', color: colors.zinc[900]},
    ],
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
                    <div className="bg-layer-1 px-4 pb-4 pt-8 sm:px-10 dark:bg-layer-1-dark">
                        <p className="text-3xl font-bold">Places</p>
                        <p className="text-base font-semibold opacity-80">A list of the best places that I have encountered on my travels, curated by me.</p>
                    </div>
                    {children}
                </body>
            </Providers>
        </html>
    )
}
