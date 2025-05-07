'use client'

import {Circle} from '@phosphor-icons/react'
import {Fragment} from 'react'

type Tag =
    | {
          type: 'primary'
          icon: React.ReactNode
          text: string
      }
    | {
          type: 'secondary'
          text: string
      }

export type Tags = (Tag | string)[]

export function TagTray({tags = []}: {tags?: Tags}) {
    if (tags.length === 0) return null
    return (
        <div className="flex flex-wrap items-center gap-1.5 px-4 text-xs font-medium">
            {tags.map((tag, i) => (
                <Fragment key={i}>
                    {typeof tag === 'string' ? <Tag type="secondary" text={tag} /> : <Tag {...tag} />}
                    {i < tags.length - 1 && <Circle weight="fill" size={5} className="opacity-60" />}
                </Fragment>
            ))}
        </div>
    )
}

function Tag(props: Tag) {
    if (props.type === 'secondary') return <p className="opacity-60">{props.text}</p>

    return (
        <>
            {props.icon}
            <p>{props.text}</p>
        </>
    )
}
