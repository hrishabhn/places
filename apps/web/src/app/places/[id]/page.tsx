import {PlacePageContent} from './content'

export default async function PlacePage({params}: {params: Promise<{id: string}>}) {
    const {id} = await params
    return <PlacePageContent id={id} />
}
