import {type NotionPlace} from '@/model/types'

import {BarChart} from '@/components/views/bar-chart'

export function HomeStats({allPlace}: {allPlace: NotionPlace[]}) {
    if (allPlace.length === 0) return 'No places found, try adjusting the filters.'

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-4 pb-4">
            <BarChart
                title="Places by City"
                data={Object.entries(
                    allPlace.reduce(
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
                    allPlace.reduce(
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
                    allPlace.reduce(
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
    )
}
