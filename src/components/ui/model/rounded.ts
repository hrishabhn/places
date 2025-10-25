import {tw} from '@/lib/tailwind'

export type Rounded = 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
export const getRoundedClass = (rounded: Rounded): string =>
    ({
        sm: tw`rounded-xs`,
        base: tw`rounded-sm`,
        md: tw`rounded-md`,
        lg: tw`rounded-lg`,
        xl: tw`rounded-xl`,
        '2xl': tw`rounded-2xl`,
        '3xl': tw`rounded-3xl`,
        full: tw`rounded-full`,
    })[rounded]
