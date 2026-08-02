import {HomeContent} from './content'

import {CityIcon, MapPinIcon} from '@phosphor-icons/react/ssr'
import Link from 'next/link'

import {appSplash, appSubtitle, appTitle} from '@/model/app'

import {Splash, SplashIcon} from '@/components/views/splash'
import {PageStack} from '@/components/views/stack'

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
                image={appSplash}
            />

            <PageStack>
                <HomeContent />
            </PageStack>
        </>
    )
}
