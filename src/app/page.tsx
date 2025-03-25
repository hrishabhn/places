import {HomeContextProvider} from './context'
import {HomeFilter} from './views/filter'
import {HomeInfo} from './views/info'
import {HomeStack} from './views/stack'

import {ForkKnife} from '@phosphor-icons/react/dist/ssr'
import {Suspense} from 'react'

import {getAllDropdown, getAllPlace} from '@/model/client'

import {PageSection} from '@/components/layout'

export default function Home() {
    return (
        <Suspense
            fallback={
                <>
                    <div className="h-8 w-full bg-accent dark:bg-accent-dark" />
                    <div className="flex flex-col items-center justify-center gap-2 py-36 text-accent dark:text-accent-dark">
                        <div className="animate-bounce rounded-full bg-accent p-2 dark:bg-accent-dark">
                            <ForkKnife weight="duotone" className="text-white" size={30} />
                        </div>
                        <p className="text-lg font-medium">Loading...</p>
                    </div>
                </>
            }
        >
            <HomeContent />
        </Suspense>
    )
}

async function HomeContent() {
    const [allPlace, allDropdown] = await Promise.all([getAllPlace(), getAllDropdown()])
    return (
        <HomeContextProvider allPlace={allPlace} {...allDropdown}>
            <HomeFilter />
            <PageSection>
                <HomeInfo />
                <HomeStack />
            </PageSection>
        </HomeContextProvider>
    )
}
