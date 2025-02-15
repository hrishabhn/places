import {type TableColumnSize} from './shared'

import {tw} from '@/lib/tailwind'

import {Card} from '@/components/ui/card'

export function TableContainer({children}: {children?: React.ReactNode}) {
    return (
        <Card rounded="lg" ring>
            <div className="overflow-x-scroll">
                <div className="flex min-w-fit flex-col gap-px bg-line dark:bg-line-dark">{children}</div>
            </div>
        </Card>
    )
}

export function TableRow({children}: {children?: React.ReactNode}) {
    return <div className="flex w-full gap-px">{children}</div>
}

type TableColumnProps = {
    size?: TableColumnSize
    children?: React.ReactNode
}

export function TableColumn({size = 'md', children}: TableColumnProps) {
    const sizeClass = {
        // xs: tw`w-32 basis-32`,
        sm: tw`w-44 basis-44`,
        md: tw`w-64 basis-64`,
        lg: tw`w-96 basis-96`,
        xl: tw`w-[512px] basis-[512px]`,
    }[size]

    return <div className={`flex shrink-0 grow ${sizeClass} `}>{children}</div>
}
