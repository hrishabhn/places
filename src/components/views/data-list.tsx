type DataListItemContent =
    | {
          staticText: string
          children?: never
      }
    | {
          staticText?: never
          children?: React.ReactNode
      }

type DataListItemProps = {
    label: string
} & DataListItemContent

export function DataListItem({label, staticText, children}: DataListItemProps) {
    if (staticText)
        return (
            <DataListItem label={label}>
                <p className="whitespace-pre-line font-medium">{staticText || '-'}</p>
            </DataListItem>
        )

    return (
        <div className="grid w-full grid-cols-1 gap-2 py-2 md:grid-cols-[1fr,3fr] md:gap-4">
            <p className="font-semibold text-g-500">{label}</p>
            <div>{children}</div>
        </div>
    )
}
