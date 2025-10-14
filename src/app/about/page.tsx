import {DatabaseIcon, GithubLogoIcon, MapPinIcon, SparkleIcon, TriangleIcon} from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

import {appDescription, appDetails} from '@/model/app'
import {notionUrl} from '@/model/util'

import {Heading} from '@/components/layout'
import {Button, ButtonTray} from '@/components/ui'
import {Section} from '@/components/views/section'

const notionDatabaseId = process.env.NOTION_DATABASE_ID

export default function About() {
    return (
        <Section>
            <Heading size="h1" serif>
                About
            </Heading>
            <Heading size="h4">{appDescription}</Heading>
            <p>{appDetails}</p>

            <Heading size="h2" serif>
                Pages
            </Heading>
            <ButtonTray>
                <Link href="/concierge" className="active:opacity-60">
                    <Button>
                        <SparkleIcon weight="duotone" />
                        <p>AI Concierge</p>
                    </Button>
                </Link>
            </ButtonTray>

            <Heading size="h2" serif>
                Links
            </Heading>
            <ButtonTray>
                {notionDatabaseId ? (
                    <Link href={notionUrl(notionDatabaseId)} target="_blank" className="active:opacity-60">
                        <Button>
                            <DatabaseIcon weight="duotone" />
                            <p>Database</p>
                        </Button>
                    </Link>
                ) : null}
                <Link href="https://developers.google.com/maps/documentation/places/web-service/place-id" target="_blank" className="active:opacity-60">
                    <Button>
                        <MapPinIcon weight="duotone" />
                        <p>Place IDs</p>
                    </Button>
                </Link>
                <Link href="https://github.com/hrishabhn/places" target="_blank" className="active:opacity-60">
                    <Button>
                        <GithubLogoIcon weight="duotone" />
                        <p>Source Code</p>
                    </Button>
                </Link>
                <Link href="https://vercel.com/hrishabhns/places" target="_blank" className="active:opacity-60">
                    <Button>
                        <TriangleIcon weight="duotone" />
                        <p>Preview</p>
                    </Button>
                </Link>
            </ButtonTray>
        </Section>
    )
}
