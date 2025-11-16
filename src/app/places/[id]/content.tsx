'use client'

import {CityIcon, FlagIcon, ForkKnifeIcon, HeartIcon, MapTrifoldIcon, PencilIcon, StarIcon, TagIcon} from '@phosphor-icons/react'
import {useSuspenseQuery} from '@tanstack/react-query'
import Link from 'next/link'
import {notFound} from 'next/navigation'

import {getPlaceIcon} from '@/app/views/place/place-icon'

import {useBookmarks} from '@/model/bookmarks'
import {googleMapsUrl, notionUrl} from '@/model/util'

import {useTRPC} from '@/lib/trpc'

import {MenuBarItem, MenuBarTray} from '@/components/views/menu-bar'
import {Section} from '@/components/views/section'
import {SectionHeader, SectionHeaderStack} from '@/components/views/section-header'
import {Splash, SplashIcon} from '@/components/views/splash'
import {PageStack} from '@/components/views/stack'

export function PlacePageContent({id}: {id: string}) {
    const trpc = useTRPC()

    const {data: place} = useSuspenseQuery(trpc.place.get.queryOptions({id}))

    const {bookmarks, toggleBookmark} = useBookmarks()

    if (place === null) return notFound()

    const tags: string[] = [...place.type, ...place.tags]

    const googleMaps = googleMapsUrl({name: place.name, city_name: place.city_name, maps_id: place.maps_id})
    const notion = notionUrl(place.id)

    return (
        <>
            <Splash
                actions={
                    <>
                        {place.top ? <SplashIcon icon={StarIcon} /> : null}
                        <SplashIcon icon={getPlaceIcon(place.type.at(0), {returnDefault: true})} />
                        <Link href={googleMaps} target="_blank" className="active:opacity-60">
                            <SplashIcon icon={MapTrifoldIcon} />
                        </Link>
                        <Link href={notion} target="_blank" className="active:opacity-60">
                            <SplashIcon icon={PencilIcon} />
                        </Link>
                    </>
                }
                title={place.name}
                subtitle={place.city_name}
                image={place.image ?? undefined}
            />
            <PageStack>
                <SectionHeaderStack>
                    <Section>
                        {tags.length > 0 ? <p className="line-clamp-1 text-sm font-semibold uppercase opacity-60">{tags.join(' • ')}</p> : null}
                        {place.description ? <p>{place.description}</p> : null}
                    </Section>

                    <MenuBarTray>
                        <Link href={googleMaps} target="_blank" className="active:opacity-60">
                            <MenuBarItem>
                                <MapTrifoldIcon weight="bold" />
                                <p>Open in Google Maps</p>
                            </MenuBarItem>
                        </Link>
                        <Link href={notion} target="_blank" className="active:opacity-60">
                            <MenuBarItem>
                                <PencilIcon weight="bold" />
                                <p>Edit</p>
                            </MenuBarItem>
                        </Link>
                    </MenuBarTray>
                </SectionHeaderStack>

                <SectionHeaderStack>
                    <Section>
                        <SectionHeader title="Actions" />
                    </Section>

                    <MenuBarTray>
                        <button onClick={() => toggleBookmark(place.id)} className="active:opacity-60">
                            <MenuBarItem active={bookmarks.includes(place.id)}>
                                <HeartIcon weight={bookmarks.includes(place.id) ? 'fill' : 'bold'} />
                                <p>Bookmark</p>
                            </MenuBarItem>
                        </button>
                    </MenuBarTray>
                </SectionHeaderStack>

                <SectionHeaderStack>
                    <Section>
                        <SectionHeader title="Related" />
                    </Section>

                    <MenuBarTray>
                        <Link href={{pathname: '/places', query: {country: place.country_slug}}} className="active:opacity-60">
                            <MenuBarItem active>
                                <FlagIcon weight="duotone" />
                                <p>{place.country_name}</p>
                            </MenuBarItem>
                        </Link>
                        <Link href={{pathname: '/places', query: {city: place.city_slug}}} className="active:opacity-60">
                            <MenuBarItem active>
                                <CityIcon weight="duotone" />
                                <p>{place.city_name}</p>
                            </MenuBarItem>
                        </Link>
                        {place.type.map(type => (
                            <Link key={type} href={{pathname: '/places', query: {type: type}}} className="active:opacity-60">
                                <MenuBarItem active>
                                    <ForkKnifeIcon weight="duotone" />
                                    <p>{type}</p>
                                </MenuBarItem>
                            </Link>
                        ))}
                        {place.tags.map(tag => (
                            <Link key={tag} href={{pathname: '/places', query: {tag: tag}}} className="active:opacity-60">
                                <MenuBarItem active>
                                    <TagIcon weight="duotone" />
                                    <p>{tag}</p>
                                </MenuBarItem>
                            </Link>
                        ))}
                    </MenuBarTray>
                </SectionHeaderStack>
            </PageStack>
        </>
    )
}
