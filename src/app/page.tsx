import {HomeContextProvider} from './context'
import {HomeFilter} from './views/filter'
import {HomeSearch} from './views/search'
import {HomeStack} from './views/stack'

import {getAllDropdown, getAllPlace} from '@/model/client'

import {PageSection} from '@/components/layout'

export default async function Home() {
    const [allPlace, allDropdown] = await Promise.all([getAllPlace(), getAllDropdown()])
    return (
        <HomeContextProvider allPlace={allPlace} {...allDropdown}>
            <HomeSearch />
            <HomeFilter />
            <PageSection>
                <HomeStack />
            </PageSection>
        </HomeContextProvider>
    )
}
