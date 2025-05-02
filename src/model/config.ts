import 'server-only'

import {z} from 'zod'

const envVariables = z.object({
    NEON_DATABASE_URL: z.string(),
    NOTION_API_KEY: z.string(),
    NOTION_DATABASE_ID: z.string(),
})

export const {
    //
    NEON_DATABASE_URL: neonDatabaseUrl,
    NOTION_API_KEY: notionApiKey,
    NOTION_DATABASE_ID: notionDatabaseId,
} = envVariables.parse(process.env)
