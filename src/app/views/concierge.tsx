'use client'

import {type NotionPlace} from '@/model/types'

import {Heading} from '@/components/layout'

export function HomeConcierge({allPlace}: {allPlace: NotionPlace[]}) {
    return (
        <>
            <Heading size="h2">AI Concierge</Heading>
            <p>Use the curated list of places to get your next recommendation.</p>

            <div className="space-y-3 py-3">
                {allPlace.map(({id, name}) => (
                    <pre key={id} className="overflow-hidden rounded-xl bg-layer-1 p-4 dark:bg-layer-1-dark">
                        {JSON.stringify({id, name}, null, 2)}
                    </pre>
                ))}
            </div>
        </>
    )
}
