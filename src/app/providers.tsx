'use client'

import {createSyncStoragePersister} from '@tanstack/query-sync-storage-persister'
import {QueryClient, defaultShouldDehydrateQuery} from '@tanstack/react-query'
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client'
import {createTRPCClient, httpBatchLink} from '@trpc/client'
import {NuqsAdapter} from 'nuqs/adapters/next/app'
import {useState} from 'react'

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

const persister = createSyncStoragePersister({storage: typeof window !== 'undefined' ? window.localStorage : undefined})

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
    const [trpcClient] = useState(() => createTRPCClient<AppRouter>({links: [httpBatchLink({url: getUrl()})]}))

    /* eslint-disable react-compiler/react-compiler */
    // return <>{children}</>
    return (
        <NuqsAdapter>
            <PersistQueryClientProvider client={queryClient} persistOptions={{persister}}>
                <TRPCProvider queryClient={queryClient} trpcClient={trpcClient}>
                    {children}
                </TRPCProvider>
            </PersistQueryClientProvider>
        </NuqsAdapter>
    )
}
