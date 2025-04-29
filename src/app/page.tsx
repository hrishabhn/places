import {HomeContextProvider} from './context'
import {HomeCityImage} from './views/city-image'
import {HomeFilter} from './views/filter'
import {HomeInfo} from './views/info'
import {HomeStack} from './views/stack'

import {Suspense} from 'react'

import {NotionClient} from '@/model/client'
import {mainPageId} from '@/model/config'

import {Loading} from '@/components/views/loading'
import {Section} from '@/components/views/section'

export default function Home() {
    return (
        <Suspense fallback={<Loading />}>
            <HomeContent />
        </Suspense>
    )
}

async function HomeContent() {
    const [allPlace, allDropdown] = await Promise.all([NotionClient.getAllPlace(), NotionClient.getAllDropdown()])
    return (
        <HomeContextProvider mainPageId={mainPageId} allPlace={allPlace} {...allDropdown}>
            <HomeFilter />
            <HomeCityImage />
            <Section>
                <HomeInfo />
                <HomeStack />
            </Section>
        </HomeContextProvider>
    )
}
