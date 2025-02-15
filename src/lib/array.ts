export function findDuplicates(array: string[]): string | undefined {
    for (const item of array) {
        if (array.filter(i => i === item).length > 1) {
            return item
        }
    }
}
