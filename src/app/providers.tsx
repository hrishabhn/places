'use client'

import {QueryClient, QueryClientProvider, defaultShouldDehydrateQuery} from '@tanstack/react-query'
import {createTRPCClient, httpBatchLink} from '@trpc/client'
import {NuqsAdapter} from 'nuqs/adapters/next/app'
import {useState} from 'react'
import superjson from 'superjson'

import {type AppRouter} from '@/server'

import {TRPCProvider} from '@/lib/trpc'

const makeQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 30,
            },
            dehydrate: {
                shouldDehydrateQuery: query => defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
            },
        },
    })

let browserQueryClient: QueryClient
function getQueryClient() {
    if (typeof window === 'undefined') return makeQueryClient()
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
}

function getUrl() {
    const base = (() => {
        if (typeof window !== 'undefined') return ''
        if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
        return 'http://localhost:3000'
    })()
    return `${base}/api/trpc`
}

export function Providers({children}: {children: React.ReactNode}) {
    const queryClient = getQueryClient()
    const [trpcClient] = useState(() =>
        createTRPCClient<AppRouter>({
            links: [
                httpBatchLink({
                    url: getUrl(),
                    transformer: superjson,
                }),
            ],
        })
    )

    /* eslint-disable react-compiler/react-compiler */
    // return <>{children}</>
    return (
        <NuqsAdapter>
            <QueryClientProvider client={queryClient}>
                <TRPCProvider queryClient={queryClient} trpcClient={trpcClient}>
                    {children}
                </TRPCProvider>
            </QueryClientProvider>
        </NuqsAdapter>
    )
}
