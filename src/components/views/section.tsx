import {Heading} from '@/components/layout'

export function Section({children}: {children?: React.ReactNode}) {
    return <div className="w-full px-4 sm:px-10">{children}</div>
}

export function SectionHeader({title, subtitle, children}: {title: string; subtitle?: string; children?: React.ReactNode}) {
    return (
        <>
            <div className="flex w-full items-end pb-2 pt-10">
                <div>
                    <Heading size="h2" withoutPadding>
                        {title}
                    </Heading>
                    <p className="font-medium opacity-80">{subtitle}</p>
                </div>

                <div className="grow" />

                {children}
            </div>
        </>
    )
}
