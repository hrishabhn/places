'use client'

import {Heading} from './heading'

type PageHeaderProps = {
    title: string
    subtitle?: string
}

export function PageHeader({title, subtitle}: PageHeaderProps) {
    return (
        <div className="flex items-end pb-6 pt-12">
            <Heading size="h1" withoutPadding>
                {title}
            </Heading>
            {subtitle && (
                <Heading size="h5" withoutPadding>
                    {subtitle}
                </Heading>
            )}
        </div>
    )
}
