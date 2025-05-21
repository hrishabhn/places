import './globals.css'
import {Providers} from './providers'

import {Analytics} from '@vercel/analytics/next'
import type {Metadata, Viewport} from 'next'
import {Inter, Lora} from 'next/font/google'

import {appDescription, appTitle} from '@/model/app'

import {Navbar} from '@/components/views/navbar'

// fonts
const inter = Inter({subsets: ['latin']})
const serif = Lora({subsets: ['latin'], variable: '--font-serif'})

// metadata
export const metadata: Metadata = {
    title: appTitle,
    description: appDescription,
    robots: {index: false},
}

export const viewport: Viewport = {themeColor: '#292718'}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <Analytics />

            <Providers>
                <body className={`${inter.className} ${serif.variable} flex min-h-screen w-full flex-col bg-layer-0 text-black antialiased dark:bg-layer-0-dark dark:text-white`}>
                    <Navbar />
                    {children}
                </body>
            </Providers>
        </html>
    )
}
