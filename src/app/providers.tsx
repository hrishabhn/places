'use client'

import {createSyncStoragePersister} from '@tanstack/query-sync-storage-persister'
import {QueryClient} from '@tanstack/react-query'
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client'
import {createTRPCClient, httpBatchLink} from '@trpc/client'
import {NuqsAdapter} from 'nuqs/adapters/next/app'
import {useState} from 'react'

import {type AppRouter} from '@/server'

import {TRPCProvider} from '@/lib/trpc'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: 1000 * 60 * 60 * 24, // 24 hours
        },
    },
})

const persister = createSyncStoragePersister({storage: typeof window !== 'undefined' ? window.localStorage : undefined})

export function Providers({children}: {children: React.ReactNode}) {
    const [trpcClient] = useState(() => createTRPCClient<AppRouter>({links: [httpBatchLink({url: '/api/trpc'})]}))

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
