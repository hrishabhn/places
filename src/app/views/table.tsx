'use client'

import {City, ForkKnife, Tag, TextT} from '@phosphor-icons/react'

import {type NotionPlace} from '@/model/types'

import {notionColorToTheme} from '@/lib/notion/color'

import {Heading} from '@/components/layout'
import {Badge} from '@/components/ui'

export function HomeTable({allPlace}: {allPlace: NotionPlace[]}) {
    return (
        <div className="overflow-x-auto rounded-lg border border-line dark:border-line-dark">
            <table className="w-full border-collapse rounded-lg">
                <thead>
                    <tr className="text-left font-medium">
                        <TH>
                            <TextT weight="bold" />
                            <p>Name</p>
                        </TH>
                        <TH>
                            <City weight="bold" />
                            <p>City</p>
                        </TH>
                        <TH>
                            <ForkKnife weight="bold" />
                            <p>Type</p>
                        </TH>
                        <TH>
                            <Tag weight="bold" />
                            <p>Tags</p>
                        </TH>
                    </tr>
                </thead>
                <tbody>
                    {allPlace.map(place => (
                        <tr key={place.id}>
                            <TD>
                                <Heading size="h3" withoutPadding>
                                    {place.name}
                                </Heading>
                            </TD>
                            <TD>
                                <Badge size="sm" theme={notionColorToTheme(place.city.color)} rounded="full">
                                    {place.city.name}
                                </Badge>
                            </TD>
                            <TD>
                                {place.type.map(p => (
                                    <Badge key={p.id} size="sm" theme={notionColorToTheme(p.color)} rounded="full">
                                        {p.name}
                                    </Badge>
                                ))}
                            </TD>
                            <TD>
                                {place.tags.map(t => (
                                    <Badge key={t.id} size="sm" theme={notionColorToTheme(t.color)} rounded="full">
                                        {t.name}
                                    </Badge>
                                ))}
                            </TD>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function TH({children}: {children?: React.ReactNode}) {
    return (
        <th className="border border-transparent border-b-line border-r-line px-2 py-1 last:border-r-transparent dark:border-b-line-dark dark:border-r-line-dark">
            <div className="flex items-center gap-1">{children}</div>
        </th>
    )
}

function TD({children}: {children?: React.ReactNode}) {
    return (
        <td className="border border-transparent border-b-line border-r-line px-2 py-1 last:border-r-transparent dark:border-b-line-dark dark:border-r-line-dark">
            <div className="flex items-center gap-1">{children}</div>
        </td>
    )
}
