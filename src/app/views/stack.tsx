'use client'

import {useHomeContext} from '../context'
import {PlaceCard} from './card'
import {HomeConcierge} from './concierge'
import {HomeTable} from './table'

import {Card} from '@/components/ui'
import {BarChart} from '@/components/views/bar-chart'
import {MapView} from '@/components/views/map'

export function HomeStack() {
    const {selectedView, displayPlace} = useHomeContext()

    switch (selectedView) {
        case 'list':
            return (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4 pb-4">
                    {displayPlace.map(place => (
                        <PlaceCard key={place.id} place={place} />
                    ))}
                </div>
            )

        case 'map':
            return (
                <Card ring rounded="lg">
                    <div className="aspect-square max-h-[512px] w-full sm:aspect-video">
                        <MapView allPlace={displayPlace} />
                    </div>
                </Card>
            )

        case 'table':
            return <HomeTable allPlace={displayPlace} />

        case 'stats':
            return (
                <>
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-4 pb-4">
                        <BarChart
                            title="Places by City"
                            data={Object.entries(
                                displayPlace.reduce(
                                    (acc, place) => {
                                        const city = place.city.name
                                        if (!acc[city]) acc[city] = 0
                                        acc[city]++
                                        return acc
                                    },
                                    {} as Record<string, number>
                                )
                            )
                                .map(([name, value]) => ({name, value}))
                                .toSorted((a, b) => b.value - a.value || a.name.localeCompare(b.name))}
                        />

                        <BarChart
                            title="Places by Type"
                            data={Object.entries(
                                displayPlace.reduce(
                                    (acc, place) => {
                                        for (const {name: type} of place.type) {
                                            if (!acc[type]) acc[type] = 0
                                            acc[type]++
                                        }
                                        return acc
                                    },
                                    {} as Record<string, number>
                                )
                            )
                                .map(([name, value]) => ({name, value}))
                                .toSorted((a, b) => b.value - a.value || a.name.localeCompare(b.name))}
                        />

                        <BarChart
                            title="Places by Tag"
                            data={Object.entries(
                                displayPlace.reduce(
                                    (acc, place) => {
                                        for (const {name: tag} of place.tags) {
                                            if (!acc[tag]) acc[tag] = 0
                                            acc[tag]++
                                        }
                                        return acc
                                    },
                                    {} as Record<string, number>
                                )
                            )
                                .map(([name, value]) => ({name, value}))
                                .toSorted((a, b) => b.value - a.value || a.name.localeCompare(b.name))}
                        />
                    </div>
                </>
            )

        case 'concierge':
            return <HomeConcierge />
    }
}
