import {HomeContentBookmarks, HomeContentCities, HomeContentPlaces} from './content'

import {CityIcon, MapPinIcon} from '@phosphor-icons/react/ssr'
import Link from 'next/link'

import {appSubtitle, appTitle} from '@/model/app'

import {Section} from '@/components/views/section'
import {SectionHeader, SectionHeaderStack} from '@/components/views/section-header'
import {Splash, SplashIcon} from '@/components/views/splash'
import {PageStack} from '@/components/views/stack'

const backdrop = new URL('https://images.unsplash.com/photo-1675757275576-c387423d1391')

export default function Home() {
    return (
        <>
            <Splash
                actions={
                    <>
                        <Link href="/cities" className="active:opacity-60">
                            <SplashIcon icon={CityIcon} />
                        </Link>
                        <Link href="/places" className="active:opacity-60">
                            <SplashIcon icon={MapPinIcon} />
                        </Link>
                    </>
                }
                title={appTitle}
                subtitle={appSubtitle}
                image={backdrop.toString()}
            />

            <PageStack>
                <HomeContentBookmarks />

                <SectionHeaderStack>
                    <Section>
                        <SectionHeader title="Cities" href="/cities" />
                    </Section>
                    <HomeContentCities />
                </SectionHeaderStack>

                <SectionHeaderStack>
                    <Section>
                        <SectionHeader title="Suggested Places" href="/places" />
                    </Section>
                    <HomeContentPlaces />
                </SectionHeaderStack>
            </PageStack>
        </>
    )
}
