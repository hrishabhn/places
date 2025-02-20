import {HomeContextProvider} from './context'
import {HomeFilter} from './views/filter'
import {HomeSearch} from './views/search'
import {HomeStack} from './views/stack'

import {getAllDropdown, getAllPlace} from '@/model/client'
import {Suspense} from 'react'

import {PageHeader, PageSection} from '@/components/layout'
import {LoadingSpinner} from '@/components/views/loading'

export default function Home() {
    return (
        <PageSection fullWidth>
            <PageHeader title="Places" subtitle="A list of the best places that I have encountered on my travels. These are the special ones that I've curated." />
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
            <HomeSearch />
            <HomeFilter />
            <HomeStack />
        </HomeContextProvider>
    )
}
