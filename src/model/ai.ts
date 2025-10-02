import {z} from 'zod'

// enums
export const allModel = ['gpt-4o-mini-search-preview', 'gpt-4o-search-preview'] as const
const ModelSchema = z.enum(allModel)
export type Model = z.infer<typeof ModelSchema>

export const allDataset = ['none', 'top', 'all'] as const
const DatasetSchema = z.enum(allDataset)
export type Dataset = z.infer<typeof DatasetSchema>

// utils
export function modelName(model: Model): string {
    switch (model) {
        case 'gpt-4o-mini-search-preview':
            return 'GPT-4o Mini'
        case 'gpt-4o-search-preview':
            return 'GPT-4o'
    }
}

export function datasetName(dataset: Dataset): string {
    switch (dataset) {
        case 'none':
            return 'None'
        case 'top':
            return 'Top'
        case 'all':
            return 'All'
    }
}

// form schema
export const ValidateKeyFormSchema = z.object({
    apiKey: z.string(),
})

export const GetRecsFormSchema = z.object({
    apiKey: z.string(),
    dataset: DatasetSchema,
    model: ModelSchema,
    city: z.string().min(1),
    type: z.string().min(1),
    info: z.string(),
})

// rec
export const RecSchema = z.object({
    name: z.string().describe('Place name'),
    city: z.string().describe('City'),
    type: z.string().describe('Type'),
    description: z.string().describe('Additional information'),
    website: z.string().url().nullable().describe('Related website or source'),
})

export type Rec = z.infer<typeof RecSchema>
