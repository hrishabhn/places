import {HomeContextProvider} from './context'
import {HomeFilter} from './views/filter'
import {HomeStack} from './views/stack'

import {getAllDropdown, getAllPlace} from '@/model/client'

import {PageHeader, PageSection} from '@/components/layout'

export default async function Home() {
    const [allPlace, allDropdown] = await Promise.all([getAllPlace(), getAllDropdown()])

    return (
        <PageSection fullWidth>
            <PageHeader title="Places" />
            <HomeContextProvider allPlace={allPlace} {...allDropdown}>
                <HomeFilter />
                <HomeStack />
            </HomeContextProvider>
        </PageSection>
    )
}
