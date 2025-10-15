import {HomeContentBookmarks, HomeContentCities, HomeContentPlaces} from './content'

import {Suspense} from 'react'

import {appSubtitle, appTitle} from '@/model/app'

import {Loading} from '@/components/views/loading'
import {Splash} from '@/components/views/splash'
import {PageStack} from '@/components/views/stack'

const backdrop = new URL('https://images.unsplash.com/photo-1675757275576-c387423d1391')

export const dynamic = 'force-dynamic'

export default function Home() {
    return (
        <>
            <Splash title={appTitle} subtitle={appSubtitle} image={backdrop.toString()} />

            <PageStack padding>
                <Suspense fallback={<Loading />}>
                    <HomeContentBookmarks />
                    <HomeContentCities />
                    <HomeContentPlaces />
                </Suspense>
            </PageStack>
        </>
    )
}
