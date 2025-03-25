'use client'

import {useHomeContext} from '../context'
import {PlaceCard} from './card'

import {Card} from '@/components/ui'
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

        case 'concierge':
            return 'Concierge'
    }
}
