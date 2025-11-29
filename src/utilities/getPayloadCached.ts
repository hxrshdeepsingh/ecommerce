import { getPayload } from "payload";
import configPromise from "@payload-config";

let cachedPayload: any;

export async function getPayloadClient() {
    if (!cachedPayload) {
        cachedPayload = await getPayload({ config: configPromise });
    }
    return cachedPayload;
}
