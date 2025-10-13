import {tw} from '@/lib/tailwind'

export function PageStack({children}: {children?: React.ReactNode}) {
    return (
        <div className="min-h-screen">
            <div className="grid auto-cols-auto grid-flow-row gap-4">{children}</div>
        </div>
    )
}

type DetailStackProps = {
    padding?: boolean
    children?: React.ReactNode
}

export function DetailStack({padding = false, children}: DetailStackProps) {
    const paddingClass = padding ? tw`py-6 sm:py-8` : ''
    return <div className={`grid grid-flow-row gap-6 sm:gap-8 ${paddingClass}`}>{children}</div>
}
