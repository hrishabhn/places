export function getSeed(): number {
    const date = new Date()
    const minutes = date.getDay() * 24 * 60 + date.getHours() * 60 + date.getMinutes()
    return minutes / (24 * 60 * 60)
}
