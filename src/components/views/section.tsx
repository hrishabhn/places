import {Heading} from '@/components/layout'

export function Section({children}: {children?: React.ReactNode}) {
    return <div className="w-full px-4 sm:px-10">{children}</div>
}

type SectionHeaderProps = {
    size?: 'md' | 'lg'
    title: string
    subtitle?: string
    children?: React.ReactNode
}

export function SectionHeader({size = 'md', title, subtitle, children}: SectionHeaderProps) {
    return (
        <>
            <div className="flex w-full items-end pb-2 pt-10">
                <div>
                    <Heading size={({lg: 'h1', md: 'h2'} as const)[size]} withoutPadding>
                        <p className="line-clamp-1 font-serif text-olive dark:text-cream">{title}</p>
                    </Heading>
                    <p className="font-medium opacity-80">{subtitle}</p>
                </div>

                <div className="grow" />

                {children}
            </div>
        </>
    )
}
