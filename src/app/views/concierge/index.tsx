'use client'

import {TextInput} from './input'
import {Website} from './website'

import {CheckCircle, Circle, City, ForkKnife, Info, Key, MapPin, Sparkle, Spinner, WarningCircle} from '@phosphor-icons/react'
import {Fragment, useActionState, useState} from 'react'
import {useLocalStorage} from 'usehooks-ts'

import {getRecs, validateKey} from '@/app/action'

import {type Dataset, type Model, allDataset, allModel, datasetName, modelName} from '@/model/ai'

import {Heading} from '@/components/layout'
import {Button, ButtonTray, Card} from '@/components/ui'
import {DataListItem} from '@/components/views/data-list'

export function HomeConcierge() {
    // form state
    const [valid, validAction, validPending] = useActionState(validateKey, null)
    const [recs, recsAction, recsPending] = useActionState(getRecs, [])

    // form values
    const [apiKey, setApiKey] = useLocalStorage('apiKey', '')
    const [dataset, setDataset] = useState<Dataset>('none')
    const [model, setModel] = useState<Model>('gpt-4o-mini-search-preview')

    return (
        <>
            <Heading size="h1">AI Concierge</Heading>
            <p>Use the curated list of places to get your next recommendation.</p>

            <Heading size="h2">API Key</Heading>

            <form action={validAction}>
                <DataListItem label="OpenAI API Key">
                    <TextInput
                        icon={Key}
                        placeholder="sk-proj-XXXX"
                        required
                        name="apiKey"
                        disabled={validPending}
                        value={apiKey}
                        setValue={newValue => setApiKey(newValue.trim())}
                    />
                </DataListItem>

                <DataListItem label="API Key Status">
                    <div className="flex items-center gap-1.5 font-medium">
                        {validPending ? (
                            <>
                                <Spinner weight="bold" className="animate-spin" />
                                <p>Validating</p>
                            </>
                        ) : valid === null ? (
                            '-'
                        ) : valid ? (
                            <>
                                <CheckCircle weight="fill" className="text-green-500" />
                                <p>Valid</p>
                            </>
                        ) : (
                            <>
                                <WarningCircle weight="fill" className="text-red-500" />
                                <p>Invalid</p>
                            </>
                        )}
                    </div>
                </DataListItem>

                <ButtonTray>
                    <div className="grow" />
                    <button type="submit" disabled={validPending} className="active:opacity-60 disabled:cursor-not-allowed disabled:opacity-60">
                        <Button>Validate Key</Button>
                    </button>
                </ButtonTray>
            </form>

            {valid && (
                <>
                    <Heading size="h2">Options</Heading>

                    <form action={recsAction}>
                        <input type="hidden" name="apiKey" value={apiKey} />

                        <DataListItem label="Data">
                            <ButtonTray>
                                {allDataset.map(d => (
                                    <button
                                        key={d}
                                        type="button"
                                        onClick={() => setDataset(d)}
                                        disabled={recsPending}
                                        className="active:opacity-60 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        <Button theme={d === dataset ? 'accent' : 'layer-1'} ring>
                                            {datasetName(d)}
                                        </Button>
                                    </button>
                                ))}
                            </ButtonTray>
                            <input type="hidden" name="dataset" value={dataset} />
                        </DataListItem>

                        <DataListItem label="Model">
                            <ButtonTray>
                                {allModel.map(m => (
                                    <button
                                        key={m}
                                        type="button"
                                        onClick={() => setModel(m)}
                                        disabled={recsPending}
                                        className="active:opacity-60 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        <Button theme={m === model ? 'accent' : 'layer-1'} ring>
                                            {modelName(m)}
                                        </Button>
                                    </button>
                                ))}
                            </ButtonTray>
                            <input type="hidden" name="model" value={model} />
                        </DataListItem>

                        <DataListItem label="City">
                            <TextInput icon={City} placeholder="City" required name="city" disabled={recsPending} />
                        </DataListItem>

                        <DataListItem label="Type">
                            <TextInput icon={ForkKnife} placeholder="Type" required name="type" disabled={recsPending} />
                        </DataListItem>

                        <DataListItem label="Additional Information">
                            <TextInput icon={Info} placeholder="Additional Information" name="info" disabled={recsPending} />
                        </DataListItem>

                        <ButtonTray>
                            <div className="grow" />
                            <button type="submit" disabled={recsPending} className="active:opacity-60 disabled:cursor-not-allowed disabled:opacity-60">
                                <Button theme="accent">
                                    <Sparkle weight="fill" />
                                    <p>Get Recommendation</p>
                                </Button>
                            </button>
                        </ButtonTray>
                    </form>

                    <Heading size="h2">Recommendations</Heading>

                    {recsPending ? (
                        <div className="flex items-center gap-1.5 font-medium">
                            <Spinner weight="bold" className="animate-spin" />
                            <p>Thinking</p>
                        </div>
                    ) : (
                        <>
                            {recs.length === 0 ? (
                                'No recommendations'
                            ) : (
                                <div className="space-y-3 pb-3">
                                    {recs.map((rec, i) => (
                                        <Card key={i} ring rounded="xl">
                                            <div className="flex flex-col gap-1 px-4 py-3">
                                                <Heading size="h3" withoutPadding>
                                                    {rec.name}
                                                </Heading>
                                                <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium">
                                                    <MapPin weight="bold" className="opacity-60" />
                                                    <p>{rec.city}</p>
                                                    {[rec.type].map(tag => (
                                                        <Fragment key={tag}>
                                                            <Circle weight="fill" size={5} className="opacity-60" />
                                                            <p className="opacity-60">{tag}</p>
                                                        </Fragment>
                                                    ))}
                                                </div>
                                                <p className="line-clamp-2">{rec.description}</p>
                                                {rec.website && <Website url={rec.website} />}
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </>
    )
}
