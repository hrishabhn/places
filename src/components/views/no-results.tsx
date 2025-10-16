import {QuestionMarkIcon} from '@phosphor-icons/react'

import {Heading} from '@/components/layout'

export function NoResults({title, subtitle}: {title: string; subtitle: string}) {
    return (
        <div className="flex flex-col items-center gap-4 py-12">
            <div className="rounded-full bg-accent-dark p-4 text-accent-light dark:bg-accent-light dark:text-accent-dark">
                <QuestionMarkIcon weight="bold" className="text-3xl" />
            </div>
            <div className="flex flex-col items-center">
                <Heading size="h4" withoutPadding>
                    {title}
                </Heading>
                <p>{subtitle}</p>
            </div>
        </div>
    )
}
