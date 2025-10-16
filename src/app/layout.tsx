import './globals.css'
import {Providers} from './providers'

import {Analytics} from '@vercel/analytics/next'
import {SpeedInsights} from '@vercel/speed-insights/next'
import type {Metadata} from 'next'
import {Gupter, Inter, Lora} from 'next/font/google'

import {appDescription, appTitle} from '@/model/app'

import {Navbar} from '@/components/views/navbar'

// fonts
const inter = Inter({subsets: ['latin'], variable: '--font-sans'})
const serif = Lora({subsets: ['latin'], variable: '--font-serif'})
const heading = Gupter({
    subsets: ['latin'],
    variable: '--font-heading',
    weight: ['400', '500', '700'],
})

// metadata
export const metadata: Metadata = {
    title: appTitle,
    description: appDescription,
    robots: {index: false},
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <Analytics />
            <SpeedInsights />
            <Providers>
                <body
                    className={`${inter.variable} ${serif.variable} ${heading.variable} flex min-h-screen w-full flex-col bg-layer-0 font-sans text-black antialiased dark:bg-layer-0-dark dark:text-white`}
                >
                    <Navbar />
                    {children}
                </body>
            </Providers>
        </html>
    )
}
