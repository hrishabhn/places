'use client'

import {CheckCircle as CheckCircleIcon, Info as InfoIcon, WarningCircle as WarningCircleIcon} from '@phosphor-icons/react'

import {tw} from '@/lib/tailwind'

type CalloutTheme = 'info' | 'success' | 'warning' | 'error'
type CalloutProps = {
    theme: CalloutTheme
    message: string
}

export function Callout({theme, message}: CalloutProps) {
    const themeClass = {
        info: tw`bg-indigo-500/20`,
        success: tw`bg-green-500/20`,
        warning: tw`bg-yellow-500/20`,
        error: tw`bg-red-500/20`,
    }[theme]

    const Icon = {
        info: InfoIcon,
        success: CheckCircleIcon,
        warning: WarningCircleIcon,
        error: WarningCircleIcon,
    }[theme]

    const iconClass = {
        info: tw`text-indigo-500`,
        success: tw`text-green-500`,
        warning: tw`text-yellow-500`,
        error: tw`text-red-500`,
    }[theme]

    return (
        <div className={`my-2 flex w-full items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium ${themeClass}`}>
            <Icon weight="fill" size={20} className={`${iconClass}`} />
            <p>{message}</p>
        </div>
    )
}
