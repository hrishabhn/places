import {type CardTheme, type Rounded, getRoundedClass} from './model'

import {tw} from '@/lib/tailwind'

type BadgeSize = 'sm' | 'md'

type BadgeProps = {
    children?: React.ReactNode
    size?: BadgeSize
    theme?: CardTheme
    border?: boolean
    rounded?: Rounded

    active?: boolean
}

export const Badge = ({children, size = 'md', theme = 'accent', border = true, rounded = 'full', active = false}: BadgeProps) => {
    const sizeClass = {
        sm: border ? tw`border-2 px-1.5 py-1 text-xs` : tw`border-0 px-2 py-1 text-xs`,
        md: border ? tw`border-2 px-2.5 py-1 text-sm` : tw`border-0 px-2.5 py-1 text-sm`,
    }[size]

    const themeClass = {
        // custom
        'layer-0': tw`bg-layer-0 dark:bg-layer-0-dark`,
        'layer-1': tw`bg-layer-1 dark:bg-layer-1-dark`,
        foreground: tw`bg-layer-1-dark text-white dark:bg-white dark:text-black`,
        hover: tw`bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10`,

        // custom
        accent: active
            ? tw`border-transparent bg-accent-dark text-accent-light dark:bg-accent-light dark:text-accent-dark`
            : tw`border-accent-dark/80 bg-accent-dark/10 text-accent-dark dark:border-accent-light/80 dark:bg-accent-light/10 dark:text-accent-light`,
        g: tw`border-g-500/80 bg-g-500/25`,

        // tailwind
        red: active ? tw`border-transparent bg-red-500 text-white` : tw`border-red-500/80 bg-red-500/10 text-red-500`,
        orange: active ? tw`border-transparent bg-orange-500 text-white` : tw`border-orange-500/80 bg-orange-500/10 text-orange-500`,
        amber: active ? tw`border-transparent bg-amber-500 text-white` : tw`border-amber-500/80 bg-amber-500/10 text-amber-500`,
        yellow: active ? tw`border-transparent bg-yellow-500 text-white` : tw`border-yellow-500/80 bg-yellow-500/10 text-yellow-500`,
        lime: active ? tw`border-transparent bg-lime-500 text-white` : tw`border-lime-500/80 bg-lime-500/10 text-lime-500`,
        green: active ? tw`border-transparent bg-green-500 text-white` : tw`border-green-500/80 bg-green-500/10 text-green-500`,
        emerald: active ? tw`border-transparent bg-emerald-500 text-white` : tw`border-emerald-500/80 bg-emerald-500/10 text-emerald-500`,
        teal: active ? tw`border-transparent bg-teal-500 text-white` : tw`border-teal-500/80 bg-teal-500/10 text-teal-500`,
        cyan: active ? tw`border-transparent bg-cyan-500 text-white` : tw`border-cyan-500/80 bg-cyan-500/10 text-cyan-500`,
        sky: active ? tw`border-transparent bg-sky-500 text-white` : tw`border-sky-500/80 bg-sky-500/10 text-sky-500`,
        blue: active ? tw`border-transparent bg-blue-500 text-white` : tw`border-blue-500/80 bg-blue-500/10 text-blue-500`,
        indigo: active ? tw`border-transparent bg-indigo-500 text-white` : tw`border-indigo-500/80 bg-indigo-500/10 text-indigo-500`,
        violet: active ? tw`border-transparent bg-violet-500 text-white` : tw`border-violet-500/80 bg-violet-500/10 text-violet-500`,
        purple: active ? tw`border-transparent bg-purple-500 text-white` : tw`border-purple-500/80 bg-purple-500/10 text-purple-500`,
        fuchsia: active ? tw`border-transparent bg-fuchsia-500 text-white` : tw`border-fuchsia-500/80 bg-fuchsia-500/10 text-fuchsia-500`,
        pink: active ? tw`border-transparent bg-pink-500 text-white` : tw`border-pink-500/80 bg-pink-500/10 text-pink-500`,
        rose: active ? tw`border-transparent bg-rose-500 text-white` : tw`border-rose-500/80 bg-rose-500/10 text-rose-500`,
    }[theme]

    const roundedClass = getRoundedClass(rounded)

    return <div className={`flex items-center gap-1 text-nowrap rounded-full font-bold ${sizeClass} ${themeClass} ${roundedClass}`}>{children}</div>
}
