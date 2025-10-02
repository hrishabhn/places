import HomeContent from './content'

import {ArrowRightIcon} from '@phosphor-icons/react/dist/ssr'
import {cookies} from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import {Suspense} from 'react'

import {appRouter} from '@/server'

import {appDescription, appSubtitle} from '@/model/app'
import {getBookmarks} from '@/model/bookmarks'

import {Loading} from '@/components/views/loading'

const backdrop = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop&crop=center'

export default function Home() {
    return (
        <>
            <div className="relative bg-layer-0-dark text-white">
                <Image src={backdrop} alt="Earth from space background" fill className="object-cover opacity-50" priority sizes="100vw" quality={85} />

                <div className="relative flex w-full flex-col items-center justify-center gap-6 px-10 py-36 text-center sm:py-64">
                    <p className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">{appSubtitle}</p>
                    <p className="text-lg font-medium md:text-xl">{appDescription}</p>

                    <Link href="/places" className="flex items-center gap-4 rounded-xl bg-olive px-3.5 py-2.5 font-medium text-cream active:opacity-60">
                        <p>Explore Places</p>
                        <ArrowRightIcon weight="bold" />
                    </Link>
                </div>
            </div>
            <Suspense fallback={<Loading />}>
                <HomeContentSuspense />
            </Suspense>
        </>
    )
}

async function HomeContentSuspense() {
    const bookmarks = await getBookmarks({cookies})

    const caller = appRouter.createCaller({})
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
