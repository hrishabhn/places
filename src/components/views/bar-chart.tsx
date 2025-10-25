'use client'

import {CaretLeftIcon} from '@phosphor-icons/react'
import {Fragment, useState} from 'react'

import {Heading} from '@/components/layout'
import {Card} from '@/components/ui'

type BarChartProps = {
    title: string
    data: {
        name: string
        value: number
    }[]
}

export function BarChart({title, data}: BarChartProps) {
    const [showAll, setShowAll] = useState<boolean>(false)

    const maxValue = Math.max(...data.map(({value}) => value))
    const displayData = showAll ? data : data.slice(0, 10)

    return (
        <Card ring rounded="xl">
            <div className="space-y-4 px-4 py-3">
                <div className="flex w-full items-center">
                    <Heading size="h2" withoutPadding>
                        {title}
                    </Heading>
                    <div className="grow" />
                    <button onClick={() => setShowAll(!showAll)} className="active:opacity-60">
                        <CaretLeftIcon weight="bold" size={16} className={`transition-transform ${showAll ? '-rotate-90' : ''}`} />
                    </button>
                </div>

                <div className="flex w-full flex-col gap-2">
                    {displayData.map(({name, value}, i) => {
                        const width = Math.round((value / maxValue) * 100 * 1000) / 1000

                        return (
                            <Fragment key={i}>
                                <div className="relative flex w-full items-center rounded-md bg-black/5 px-1.5 py-1 text-xs font-bold dark:bg-white/5">
                                    <div className="absolute inset-0 h-full rounded-[inherit] bg-layer-0-dark dark:bg-layer-0-light" style={{width: `${width}%`}} />

                                    <p className="relative text-white mix-blend-difference">{name}</p>
                                    <div className="w-4 grow" />
                                    <p className="relative text-white mix-blend-difference">{value}</p>
                                </div>
                            </Fragment>
                        )
                    })}
                </div>
            </div>
        </Card>
    )
}
