export function MenuBarItem({active = false, children}: {active?: boolean; children?: React.ReactNode}) {
    return (
        <div className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold ${active ? 'bg-cream text-olive' : 'bg-cream/5 text-cream hover:hover:bg-cream/10'}`}>
            {children}
        </div>
    )
}
