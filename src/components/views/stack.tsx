import {tw} from '@/lib/tailwind'

export function PageStack({padding = false, children}: {padding?: boolean; children?: React.ReactNode}) {
    return <div className={`grid auto-cols-auto grid-flow-row gap-6 sm:gap-8 ${padding ? tw`py-6 sm:py-8` : ''}`}>{children}</div>
}
