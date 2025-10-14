type HLineProps = {
    size?: 'sm' | 'md' | 'lg'
}

export function HLine({size = 'sm'}: HLineProps) {
    const sizeClass = {
        sm: 'h-0.5',
        md: 'h-1',
        lg: 'h-2',
    }[size]

    return <div className={`w-full bg-accent-dark opacity-100 dark:bg-accent-light ${sizeClass}`} />
}
