import {parseAsArrayOf, parseAsBoolean, parseAsString, useQueryState} from 'nuqs'

export const useArrayState = (key: string) => {
    const [value, setValue] = useQueryState(key, parseAsArrayOf(parseAsString).withDefault([]))

    const clear = () => setValue([])

    const add = (item: string) => {
        if (!value.includes(item)) setValue([...value, item])
    }

    const remove = (item: string) => setValue(value.filter(v => v !== item))

    const toggle = (item: string) => {
        if (value.includes(item)) remove(item)
        else add(item)
    }

    const getToggledValue = (item: string) => (value.includes(item) ? value.filter(v => v !== item) : [...value, item])

    return {value, clear, add, remove, toggle, getToggledValue}
}

export const useBooleanState = (key: string) => {
    const [value, setValue] = useQueryState(key, parseAsBoolean.withDefault(false))

    const setTrue = () => setValue(true)
    const setFalse = () => setValue(false)
    const toggle = () => setValue(!value)

    return {value, setTrue, setFalse, toggle}
}
