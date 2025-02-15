import {debounce} from 'lodash'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const inputDebounce = <T extends (...args: any) => any>(func: T) => debounce(func, 250)
