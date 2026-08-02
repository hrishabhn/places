import {db} from '@/server/db/client'

import {OGImageView} from '@/components/views/og-image-view'

export default async function Image({params}: {params: Promise<{citySlug: string}>}) {
    const {citySlug} = await params

    const city = await db.city.get({slug: citySlug})
    if (city === null) return OGImageView()

    return OGImageView({city: {name: city.name, image: city.image}})
}
