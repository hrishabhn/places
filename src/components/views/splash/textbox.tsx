type SplashTextBoxProps = {
    actions?: React.ReactNode
    title: string
    subtitle?: string
}

export function SplashTextBox({actions, title, subtitle}: SplashTextBoxProps) {
    return (
        <>
            {actions ? <div className="grid auto-cols-auto grid-flow-col gap-2 py-2">{actions}</div> : null}
            <p className="line-clamp-3 font-heading text-6xl lg:text-9xl">{title}</p>
            {subtitle ? <p className="line-clamp-3 font-heading text-4xl lg:text-6xl">{subtitle}</p> : null}{' '}
        </>
    )
}
