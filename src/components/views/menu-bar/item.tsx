export function MenuBarItem({active = false, children}: {active?: boolean; children?: React.ReactNode}) {
    return (
        <div
            className={`flex items-center gap-2 text-nowrap rounded-full border-2 px-2.5 py-1.5 text-sm font-semibold ${active ? 'border-transparent bg-accent-dark text-accent-light dark:bg-accent-light dark:text-accent-dark' : 'border-current text-accent-dark hover:bg-accent-dark/10 dark:text-accent-light dark:hover:bg-accent-light/10'}`}
        >
            {children}
        </div>
    )
}
