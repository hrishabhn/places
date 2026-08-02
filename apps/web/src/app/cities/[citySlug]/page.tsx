import {notFound, redirect} from 'next/navigation'

import {db} from '@repo/db'

export default async function CityPage({params}: PageProps<'/cities/[citySlug]'>) {
    const {citySlug} = await params

    const city = await db.city.get({slug: citySlug})
    if (city === null) return notFound()

    return redirect(`/places?city=${city.slug}`)
}
