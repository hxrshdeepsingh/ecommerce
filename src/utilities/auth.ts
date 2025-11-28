import configPromise from '@payload-config';
import { getPayload } from 'payload';

let cachedUser: any = null;

export async function getAuthUser(headers: any) {
    if (cachedUser) return cachedUser;
    const payload = await getPayload({ config: configPromise });
    const { user } = await payload.auth({ headers });
    cachedUser = user;
    return user;
}
