import {NextResponse} from 'next/server'

import {getAllPlace} from '@/model/client'

export const GET = async () => NextResponse.json(await getAllPlace())
