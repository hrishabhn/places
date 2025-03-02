import {getAllPlace} from '@/model/client'
import {NextResponse} from 'next/server'

export const GET = async () => NextResponse.json(await getAllPlace())
