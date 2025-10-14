import HomeContent from './content'

import {ArrowRightIcon} from '@phosphor-icons/react/dist/ssr'
import {cookies} from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import {Suspense} from 'react'

import {appRouter} from '@/server'

import {appSubtitle, appTitle} from '@/model/app'
import {getBookmarks} from '@/model/bookmarks'

import {Loading} from '@/components/views/loading'
import {SplashTextbox} from '@/components/views/splash'
import {PageStack} from '@/components/views/stack'

const backdrop = new URL('https://images.unsplash.com/photo-1549106765-3d312a9425e1')

export default function Home() {
    return (
        <>
            <div className="relative text-accent-dark">
                <Image src={backdrop.toString()} alt="Earth from space background" fill className="object-cover object-right-bottom" priority sizes="100vw" quality={85} />

                <div className="relative flex h-96 w-full flex-col items-start justify-start px-4 py-6 text-start sm:h-[32rem] sm:p-10">
                    <SplashTextbox title={appTitle} subtitle={appSubtitle} />

                    <div className="grow" />

                    <Link href="/places" className="flex items-center gap-4 rounded-full border-2 border-current px-3 py-1.5 font-serif text-lg font-semibold active:opacity-60">
                        <p>Discover</p>
                        <ArrowRightIcon weight="bold" />
                    </Link>
                </div>
            </div>
            <PageStack padding>
                <Suspense fallback={<Loading />}>
                    <HomeContentSuspense />
                </Suspense>
            </PageStack>
        </>
    )
}

const caller = appRouter.createCaller({})

async function HomeContentSuspense() {
    const bookmarks = await getBookmarks({cookies})

    const [allPlaceBookmark, allCity, allPlaceNew, allPlaceRandom] = await Promise.all([
        bookmarks.length > 0 ? caller.GetAllPlace({filter: {id: bookmarks}, sort: 'name'}) : [],
        caller.GetAllCity({sort: 'place_count', limit: 5}),
        caller.GetAllPlace({sort: 'first_visit', limit: 5}),
        caller.GetAllPlace({sort: 'random', limit: 5}),
    ])

    return (
        <HomeContent
            initialBookmarks={bookmarks}
            initialAllPlaceBookmark={allPlaceBookmark}
            initialAllCity={allCity}
            initialAllPlaceNew={allPlaceNew}
            initialAllPlaceRandom={allPlaceRandom}
        />
    )
}
