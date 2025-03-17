import {type TableColumnSize} from '../shared'

import {tw} from '@/lib/tailwind'

import {type InputProps} from '@/components/shared'

export {type TableColumnSize}
export type TableInputProps<T> = {size?: TableColumnSize} & InputProps<T>

export const tableInputClass = tw`w-full flex-1 border-2 border-transparent bg-layer-1 px-3.5 py-2.5 text-sm font-medium outline-none focus:border-accent dark:bg-layer-1-dark dark:focus:border-accent-dark`
