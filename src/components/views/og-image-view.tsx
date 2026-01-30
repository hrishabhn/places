/* eslint-disable @next/next/no-img-element */
import {ImageResponse} from 'next/og'
import {readFile} from 'node:fs/promises'
import {join} from 'node:path'

import {appSplash, appSubtitle, appTitle} from '@/model/app'

export const alt = `${appTitle} Preview`
export const size = {width: 1200, height: 630}

export const contentType = 'image/png'

type City = {
    name: string
    image: string | null
}

export async function OGImageView({city}: {city?: City} = {}): Promise<ImageResponse> {
    return new ImageResponse(
        <div
            style={{
                display: 'flex',
                height: '100%',
                width: '100%',
            }}
        >
            <img
                src={city?.image ?? appSplash}
                alt="App Logo"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    inset: '0',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                    padding: '0.5em',
                    backgroundImage: 'linear-gradient(to bottom, #00000033, #000000cc 50%, #000000cc)',
                    color: 'white',
                    fontSize: '4em',
                    fontWeight: 'bold',
                    backdropFilter: 'blur(40px)',
                    WebkitBackdropFilter: 'blur(40px)',
                }}
            >
                <p
                    style={{
                        margin: 0,
                        fontSize: '1.75em',
                    }}
                >
                    {city ? city.name : appTitle}
                </p>

                <p
                    style={{
                        margin: 0,
                        fontSize: '0.8em',
                        opacity: 0.8,
                    }}
                >
                    {city ? `${appTitle}: ${appSubtitle}` : appSubtitle}
                </p>
            </div>
        </div>,
        {
            ...size,
            fonts: [
                {
                    name: 'Gupter Medium',
                    data: await readFile(join(process.cwd(), 'src/public/gupter/Gupter-Medium.ttf')),
                    style: 'normal',
                    weight: 500,
                },
            ],
        }
    )
}
