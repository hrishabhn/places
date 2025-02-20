import './globals.css'
import {Providers} from './providers'

import type {Metadata} from 'next'

import {karla} from '@/components/layout'
import {StyledToastContainer} from '@/components/layout'

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
                    {children}
                    <StyledToastContainer />
                </body>
            </Providers>
        </html>
    )
}
