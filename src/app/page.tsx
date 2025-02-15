import {HomeContextProvider} from './context'
import {HomeFilter} from './views/filter'
import {HomeStack} from './views/stack'

import {getAllDropdown, getAllPlace} from '@/model/client'
import {Suspense} from 'react'

import {PageHeader, PageSection} from '@/components/layout'
import {LoadingSpinner} from '@/components/views/loading'

export default function Home() {
    return (
        <PageSection fullWidth>
            <PageHeader title="Places" />
            <Suspense fallback={<LoadingSpinner />}>
                <HomeContent />
            </Suspense>
        </PageSection>
    )
}

async function HomeContent() {
    const [allPlace, allDropdown] = await Promise.all([getAllPlace(), getAllDropdown()])
    return (
        <HomeContextProvider allPlace={allPlace} {...allDropdown}>
            <HomeFilter />
            <HomeStack />
        </HomeContextProvider>
    )
}

export const revalidate = 0
