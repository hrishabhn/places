'use client'

import {useHomeContext} from '../../context'
import './style.css'

import {useQuery} from '@tanstack/react-query'

import {useTRPC} from '@/lib/trpc'

import {robotoSlab} from '@/components/layout'
import {SimpleImage} from '@/components/ui'

export function HomeCityImage() {
    const {selectedCity} = useHomeContext()
    if (selectedCity.length !== 1) return null
    return <HomeCityImageContent name={selectedCity[0].name} />
}

function HomeCityImageContent({name}: {name: string}) {
    // return name
    const trpc = useTRPC()
    const {data} = useQuery(trpc.getCityImage.queryOptions(name))

    if (!data) return null
    return (
        <div className="relative aspect-video max-h-96 w-full">
            <SimpleImage url={data} alt={name} verticalAlign="top" />
            <div className="gradient-mask absolute inset-0 backdrop-blur-xl" />
            <div className={`${robotoSlab.className} absolute inset-0 flex items-end justify-start px-4 py-2 text-3xl font-medium text-white sm:px-10 sm:py-4`}>{name}</div>
        </div>
    )
}
