'use client'

import {StarIcon} from '@phosphor-icons/react'

import {type Place} from '@/server/types'

import {countryFlag} from '@/model/util'

import {SimpleImage} from '@/components/ui'
import {type Tags} from '@/components/views/tags'

export function placeToTags(place: Place): Tags {
    return [
        ...(place.top
            ? [
                  {
                      type: 'primary' as const,
                      icon: <StarIcon weight="fill" className="text-yellow-400" />,
                      text: 'Top',
                  },
              ]
            : []),
        {
            type: 'primary',
            icon: (
                <div className="size-[1em]">
                    <SimpleImage url={countryFlag(place.country_code)} />
                </div>
            ),
            text: place.city_name,
        },
        ...place.type,
        ...place.tags,
    ]
}
