import {DatabaseIcon, GithubLogoIcon, MapPinIcon, TriangleIcon} from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

import {appDescription, appDetails} from '@/model/app'
import {notionUrl} from '@/model/util'

import {Heading} from '@/components/layout'
import {ButtonTray} from '@/components/ui'
import {MenuBarItem} from '@/components/views/menu-bar'
import {Section} from '@/components/views/section'
import {SectionHeader, SectionHeaderStack} from '@/components/views/section-header'
import {PageStack} from '@/components/views/stack'

const notionDatabaseId = process.env.NOTION_DATABASE_ID

export default function About() {
    return (
        <PageStack padding>
            <Section>
                <Heading size="h1" serif>
                    About
                </Heading>
                <Heading size="h4">{appDescription}</Heading>
                <p>{appDetails}</p>
            </Section>

            <SectionHeaderStack>
                <Section>
                    <SectionHeader title="Links" />
                </Section>
                <Section>
                    <ButtonTray>
                        {notionDatabaseId ? (
                            <Link href={notionUrl(notionDatabaseId)} target="_blank" className="active:opacity-60">
                                <MenuBarItem active>
                                    <DatabaseIcon weight="duotone" />
                                    <p>Database</p>
                                </MenuBarItem>
                            </Link>
                        ) : null}
                        <Link href="https://developers.google.com/maps/documentation/places/web-service/place-id" target="_blank" className="active:opacity-60">
                            <MenuBarItem active>
                                <MapPinIcon weight="duotone" />
                                <p>Place IDs</p>
                            </MenuBarItem>
                        </Link>
                        <Link href="https://github.com/hrishabhn/places" target="_blank" className="active:opacity-60">
                            <MenuBarItem active>
                                <GithubLogoIcon weight="duotone" />
                                <p>Source Code</p>
                            </MenuBarItem>
                        </Link>
                        <Link href="https://vercel.com/hrishabhns/places" target="_blank" className="active:opacity-60">
                            <MenuBarItem active>
                                <TriangleIcon weight="duotone" />
                                <p>Preview</p>
                            </MenuBarItem>
                        </Link>
                    </ButtonTray>
                </Section>
            </SectionHeaderStack>
        </PageStack>
    )
}
