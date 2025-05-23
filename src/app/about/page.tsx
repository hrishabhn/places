import {Database, GithubLogo, MapPin, Sparkle, Triangle} from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

import {appDescription, appDetails} from '@/model/app'
import {notionDatabaseId} from '@/model/config'

import {Heading} from '@/components/layout'
import {Button, ButtonTray} from '@/components/ui'
import {Section, SectionHeader} from '@/components/views/section'

export default function About() {
    return (
        <Section>
            <SectionHeader size="lg" title="About" subtitle={appDescription} />
            <p>{appDetails}</p>

            <Heading size="h3">Pages</Heading>
            <ButtonTray>
                <Link href="/concierge" className="active:opacity-60">
                    <Button>
                        <Sparkle weight="duotone" />
                        <p>AI Concierge</p>
                    </Button>
                </Link>
            </ButtonTray>

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
