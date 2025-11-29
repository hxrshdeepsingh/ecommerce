import { getPayload } from "payload"
import configPromise from "@payload-config"

let cached: any = null

export async function getPayloadClient() {
    if (!cached) {
        cached = await getPayload({ config: configPromise })
    }
    return cached
}
