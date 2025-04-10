import {NextResponse} from 'next/server'

import {NotionClient} from '@/model/client'

export const GET = async () => NextResponse.json(await NotionClient.getAllPlace())
