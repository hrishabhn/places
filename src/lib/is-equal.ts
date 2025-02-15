import {isEqual as lodashIsEqual, pickBy} from 'lodash'

const dropUndefined = <T extends object>(obj: T) => pickBy(obj, v => v !== undefined)

export function isEqual<T extends object>(a: T, b: T): boolean {
    return lodashIsEqual(dropUndefined(a), dropUndefined(b))
}
