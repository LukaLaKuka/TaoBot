import 'dotenv/config'
import * as env from 'env-var'

export const Configuration = {
    DISCORD_TOKEN: env.get('DISCORD_TOKEN').required().asString(),
    CLIENT_ID: env.get('CLIENT_ID').required().asString(),
}