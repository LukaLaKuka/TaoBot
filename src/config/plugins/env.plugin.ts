import 'dotenv/config'
import * as env from 'env-var'

export const Configuration = {
    DISCORD_TOKEN: env.get('DISCORD_TOKEN').asString(),
    CLIENT_ID: env.get('CLIENT_ID').asString(),
}