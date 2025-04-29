import {neon} from '@neondatabase/serverless'

import {neonDatabaseUrl} from '@/model/config'

export const sql = neon(neonDatabaseUrl)
