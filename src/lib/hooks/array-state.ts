import {parseAsArrayOf, parseAsString, useQueryState} from 'nuqs'

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
    return {value, setValue, clear, add, remove, toggle}
}
