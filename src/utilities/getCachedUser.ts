import { type Payload } from "payload";

let cachedUser: any = null;

export async function getCachedUser(payload: Payload, headers: any) {
    if (!cachedUser) {
        try {
            // Ensure headers are in a format Payload accepts (Web Headers API)
            const webHeaders = new Headers();
            if (headers) {
                // Handle Next.js ReadonlyHeaders or plain object
                const headersIterator = typeof headers.entries === 'function' ? headers.entries() : Object.entries(headers);
                for (const [key, value] of headersIterator) {
                    webHeaders.set(key, value as string);
                }
            }

            const { user } = await payload.auth({ headers: webHeaders });
            cachedUser = user;
        } catch (error) {
            console.error('getCachedUser: payload.auth failed', error);
            return null;
        }
    }
    return cachedUser;
}
