import { type Payload } from "payload";
import { cache } from 'react';

export const getCachedUser = cache(async (payload: Payload, headers: any) => {
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
        return user;
    } catch (error) {
        console.error('getCachedUser: payload.auth failed', error);
        return null;
    }
});
