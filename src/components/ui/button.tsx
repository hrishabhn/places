import {Card} from './card'
import type {CardTheme, Rounded} from './model'

import {type Icon, type IconWeight} from '@phosphor-icons/react'
import {Spinner} from '@phosphor-icons/react/dist/ssr'

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'

type ButtonStyleProps = {
    size?: ButtonSize
    theme?: CardTheme
    ring?: boolean
    rounded?: Rounded
}

type ButtonStateProps = {active?: boolean}

type ButtonProps = {children?: React.ReactNode} & ButtonStyleProps & ButtonStateProps

export const Button = ({children, size = 'md', ring, theme = 'accent', rounded = 'lg', active = false}: ButtonProps) => {
    const sizeClass = {
        xs: 'px-2 py-1 text-xs gap-1.5',
        sm: 'px-2.5 py-1.5 text-xs gap-2',
        md: 'px-2.5 py-1.5 text-sm gap-2',
        lg: 'px-3 py-2 text-base gap-2',
    }[size]

    return (
        <Card theme={theme} ring={ring} rounded={rounded} active={active}>
            <div className={`flex items-center justify-center gap-1 font-medium ${sizeClass}`}>{children}</div>
        </Card>
    )
}

type IconButtonProps = {icon: Icon; weight?: IconWeight; pending?: boolean} & ButtonStyleProps & ButtonStateProps

export const IconButton = ({icon, weight = 'duotone', pending, size = 'md', ring, theme, rounded = 'lg', active = false}: IconButtonProps) => {
    const sizeClass = {
        xs: 'p-1.5 text-xs',
        sm: 'p-1.5 text-sm',
        md: 'p-1.5 text-base',
        lg: 'p-1.5 text-lg',
    }[size]

    const Icon = icon
    return (
        <div>
            <Card theme={theme} ring={ring} rounded={rounded} active={active} aspect="square">
                <div className={`flex items-center justify-center ${sizeClass}`}>{pending ? <Spinner weight={weight} className="animate-spin" /> : <Icon weight={weight} />}</div>
            </Card>
        </div>
    )
}

type ButtonTrayProps = {
    items?: 'start' | 'center' | 'end'
    children?: React.ReactNode
}

export const ButtonTray = ({items = 'center', children}: ButtonTrayProps) => {
    const itemsClass = {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
    }[items]

    return <div className={`flex flex-wrap gap-2 ${itemsClass}`}>{children}</div>
}
