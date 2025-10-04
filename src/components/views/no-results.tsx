import {Heading} from '@/components/layout'

export function NoResults({title, subtitle}: {title: string; subtitle: string}) {
    return (
        <div className="flex flex-col items-center py-12">
            <Heading size="h4" withoutPadding>
                {title}
            </Heading>
            <p>{subtitle}</p>
        </div>
    )
}
