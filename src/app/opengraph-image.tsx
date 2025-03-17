import {ImageResponse} from 'next/og'
import {readFile} from 'node:fs/promises'
import {join} from 'node:path'
import {type CSSProperties} from 'react'
import colors from 'tailwindcss/colors'

// Image metadata
export const alt = 'Travel Guide Preview'
export const size = {width: 1200, height: 630}

export const contentType = 'image/png'

// config
const accent = colors.red[800]
const stack = (flexDirection: 'row' | 'column' = 'column'): CSSProperties => ({
    display: 'flex',
    flexDirection,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0',
    margin: '0',
    boxSizing: 'border-box',
})

// Image generation
export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    ...stack(),
                    height: '100%',
                    width: '100%',
                    padding: '1.5em',
                    paddingBottom: '0',
                    background: colors.zinc[300],
                    fontSize: 64,
                }}
            >
                <div
                    style={{
                        ...stack(),
                        width: '100%',
                        flexGrow: 1,
                        backgroundColor: colors.white,
                        borderRadius: '0.5em 0.5em 0 0',
                        boxShadow: '0 0 32px #00000033',
                        overflow: 'hidden',
                        color: 'white',
                        fontWeight: 'bold',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            width: '100%',
                            backgroundColor: accent,
                            color: 'white',
                            flexShrink: 0,
                            padding: '0.5em 1em',
                        }}
                    >
                        <p style={{margin: 0, fontSize: '1.5em'}}>Travel Guide</p>
                    </div>

                    <div
                        style={{
                            ...stack(),
                            width: '100%',
                            flexGrow: 1,
                            flexBasis: 0,
                            gap: '0.75em',
                            padding: '0.5em 1em',
                            paddingBottom: 0,
                        }}
                    >
                        <div
                            style={{
                                ...stack('row'),
                                width: '100%',
                                flexGrow: 1,
                                flexBasis: 0,
                                gap: '0.5em',
                            }}
                        >
                            {Array.from({length: 3}).map((_, i) => (
                                <div
                                    key={i}
                                    style={{
                                        flexGrow: 1,
                                        flexBasis: 0,
                                        height: '100%',
                                        padding: '1em',
                                        border: `1px solid ${colors.zinc[200]}`,
                                        borderRadius: '0.5em',
                                        backgroundColor: colors.zinc[100],
                                    }}
                                />
                            ))}
                        </div>
                        <div
                            style={{
                                ...stack('row'),
                                width: '100%',
                                flexGrow: 0.5,
                                flexBasis: 0,
                                gap: '0.5em',
                            }}
                        >
                            {Array.from({length: 3}).map((_, i) => (
                                <div
                                    key={i}
                                    style={{
                                        flexGrow: 1,
                                        flexBasis: 0,
                                        height: '100%',
                                        padding: '1em',
                                        border: `1px solid ${colors.zinc[200]}`,
                                        borderBottom: 'none',
                                        borderRadius: '0.5em 0.5em 0 0',
                                        backgroundColor: colors.zinc[100],
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
            fonts: [
                {
                    name: 'Roboto Slab',
                    data: await readFile(join(process.cwd(), 'src/public/roboto-slab/RobotoSlab-Bold.ttf')),
                    style: 'normal',
                    weight: 700,
                },
            ],
        }
    )
}
