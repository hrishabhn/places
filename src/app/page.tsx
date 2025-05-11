import {CityCard} from './views/city/card'
import {PlaceCard} from './views/place/card'

import {ArrowRight} from '@phosphor-icons/react/dist/ssr'
import {getCookie} from 'cookies-next/server'
import {cookies} from 'next/headers'
import Link from 'next/link'
import {Suspense} from 'react'

import {appRouter} from '@/server'

import {appDescription, appSubtitle} from '@/model/app'
import {BookmarksSchema} from '@/model/bookmarks'

import {Button} from '@/components/ui'
import {Loading} from '@/components/views/loading'
import {ScrollStack} from '@/components/views/scroll'
import {Section, SectionHeader} from '@/components/views/section'

const backdrop = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa'

export default function Home() {
    return (
        <>
            <div className="relative bg-layer-0-dark text-white">
                <div style={{backgroundImage: `url(${backdrop})`}} className="absolute inset-0 bg-cover bg-center opacity-50" />

                <div className="relative flex w-full flex-col items-center justify-center gap-6 px-10 py-36 text-center sm:py-64">
                    <p className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">{appSubtitle}</p>
                    <p className="text-lg font-medium md:text-xl">{appDescription}</p>

                    <Link href="/places" className="flex items-center gap-4 rounded-xl bg-accent-dark px-3.5 py-2.5 font-medium active:opacity-60">
                        <p>Explore Places</p>
                        <ArrowRight weight="bold" />
                    </Link>
                </div>
            </div>

            <Suspense fallback={<Loading />}>
                <HomeContent />
            </Suspense>
        </>
    )
}

async function HomeContent() {
    const bookmarks = BookmarksSchema.parse(await getCookie('bookmarks', {cookies}))

    const caller = appRouter.createCaller({})
    const [allCity, allPlaceBookmark, allPlaceNew, allPlaceRandom] = await Promise.all([
        caller.GetAllCity({sort: 'place_count', limit: 5}),
        caller.GetAllPlace({filter: {id: bookmarks}, sort: 'name'}),
        caller.GetAllPlace({sort: 'created', limit: 5}),
        caller.GetAllPlace({sort: 'random', limit: 5}),
    ])

    return (
        <>
            {bookmarks.length > 0 && (
                <>
                    <Section>
                        <SectionHeader title="Your Bookmarks" subtitle="Saved places">
                            <ViewAll href="/places?bookmarks=true" />
                        </SectionHeader>
                    </Section>
                    <ScrollStack>
                        {allPlaceBookmark.map(place => (
                            <PlaceCard key={place.id} place={place} />
                        ))}
                    </ScrollStack>
                </>
            )}

            <Section>
                <SectionHeader title="Cities" subtitle="Most popular cities">
                    <ViewAll href="/cities" />
                </SectionHeader>
            </Section>
            <ScrollStack>
                {allCity.map(city => (
                    <CityCard key={city.slug} city={city} />
                ))}
            </ScrollStack>

            <Section>
                <SectionHeader title="Recently Added" subtitle="New additions to the collection">
                    <ViewAll href="/places" />
                </SectionHeader>
            </Section>
            <ScrollStack>
                {allPlaceNew.map(place => (
                    <PlaceCard key={place.id} place={place} />
                ))}
            </ScrollStack>

            <Section>
                <SectionHeader title="Random Picks" subtitle="Discover hidden gems">
                    <ViewAll href="/places" />
                </SectionHeader>
            </Section>
            <ScrollStack>
                {allPlaceRandom.map(place => (
                    <PlaceCard key={place.id} place={place} />
                ))}
            </ScrollStack>
        </>
    )
}

function ViewAll({href}: {href: string}) {
    return (
        <Link href={href} className="flex items-center gap-2 rounded-xl active:opacity-60">
            <Button theme="layer-1" ring>
                <p>View All</p>
                <ArrowRight weight="bold" />
            </Button>
        </Link>
    )
}
