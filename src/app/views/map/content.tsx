'use client'

import {useHomeContext} from '../../context'

import {MapView} from '@/components/views/map'

export function HomeMapContent() {
    const {showMap, displayPlace, toggleShowMap} = useHomeContext()
    if (!showMap) return null
    return <MapView allPlace={displayPlace} onClose={() => toggleShowMap()} />
}
