import {Heading, PageSection} from '@/components/layout'
import {LoadingSpinner} from '@/components/views/loading'

export function LoadingExample() {
    return (
        <PageSection>
            <Heading size="h1">Loading Indicator</Heading>
            <LoadingSpinner />
        </PageSection>
    )
}
