import './globals.css'
import {Providers} from './providers'

import type {Metadata, Viewport} from 'next'
import colors from 'tailwindcss/colors'

import {appDescription, appTitle} from '@/model/app'

import {inter} from '@/components/layout'
import {Navbar} from '@/components/views/navbar'

export const metadata: Metadata = {
    title: appTitle,
    description: appDescription,
    robots: {index: false},
}

export const viewport: Viewport = {
    themeColor: [
        {media: '(prefers-color-scheme: light)', color: colors.red[800]},
        {media: '(prefers-color-scheme: dark)', color: colors.red[700]},
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
                <body className={`${inter.className} flex min-h-screen w-full flex-col bg-layer-0 text-black antialiased dark:bg-layer-0-dark dark:text-white`}>
                    <Navbar />
                    {children}
                </body>
            </Providers>
        </html>
    )
}
