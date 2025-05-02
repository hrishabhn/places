import {Database, GithubLogo, MapPin, Triangle} from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

import {notionDatabaseId} from '@/model/config'

import {Heading} from '@/components/layout'
import {Button, ButtonTray} from '@/components/ui'
import {Section} from '@/components/views/section'

export default function About() {
    return (
        <Section>
            <Heading size="h1">About</Heading>
            <p>A curated list of the best places that I have encountered on my travels</p>

            <Heading size="h3">Links</Heading>
            <ButtonTray>
                <Link href={`https://notion.so/${notionDatabaseId}`} target="_blank" className="active:opacity-60">
                    <Button>
                        <Database weight="duotone" />
                        <p>Database</p>
                    </Button>
                </Link>
                <Link href="https://developers.google.com/maps/documentation/places/web-service/place-id" target="_blank" className="active:opacity-60">
                    <Button>
                        <MapPin weight="duotone" />
                        <p>Place IDs</p>
                    </Button>
                </Link>
                <Link href="https://github.com/hrishabhn/places" target="_blank" className="active:opacity-60">
                    <Button>
                        <GithubLogo weight="duotone" />
                        <p>Source Code</p>
                    </Button>
                </Link>
                <Link href="https://vercel.com/hrishabhns/places" target="_blank" className="active:opacity-60">
                    <Button>
                        <Triangle weight="duotone" />
                        <p>Preview</p>
                    </Button>
                </Link>
            </ButtonTray>
        </Section>
    )
}
