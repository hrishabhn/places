'use client'

import {CircleIcon} from '@phosphor-icons/react'
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

export function TagTray({tags = [], size}: {tags?: Tags; size: 'sm' | 'md' | 'lg'}) {
    if (tags.length === 0) return null

    const tagSize = {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
    }[size]

    return (
        <div className={`flex flex-wrap items-center gap-1.5 font-medium ${tagSize}`}>
            {tags.map((tag, i) => (
                <Fragment key={i}>
                    {typeof tag === 'string' ? <Tag type="secondary" text={tag} /> : <Tag {...tag} />}
                    {i < tags.length - 1 && <CircleIcon weight="fill" size={5} className="opacity-60" />}
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
