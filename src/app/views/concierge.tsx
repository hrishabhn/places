'use client'

import {type NotionPlace} from '@/model/types'

import {Heading} from '@/components/layout'

export function HomeConcierge({allPlace}: {allPlace: NotionPlace[]}) {
    return (
        <>
            <Heading size="h2">AI Concierge</Heading>
            <p>Use the curated list of places to get your next recommendation.</p>
        </>
    )
}
