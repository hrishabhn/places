import {ImageResponse} from 'next/og'
import {readFile} from 'node:fs/promises'
import {join} from 'node:path'

import {appDescription, appTitle} from '@/model/app'

// Image metadata
export const alt = `${appTitle} Preview`
export const size = {width: 1200, height: 630}

export const contentType = 'image/png'

// Image generation
export default async function Image() {
    return new ImageResponse(
        <div
            style={{
                display: 'flex',
                height: '100%',
                width: '100%',
            }}
        >
            <img
                src="https://images.unsplash.com/photo-1675757275576-c387423d1391"
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
                    {appTitle}
                </p>
                <p
                    style={{
                        margin: 0,
                        fontSize: '0.8em',
                        opacity: 0.8,
                    }}
                >
                    {appDescription}
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
