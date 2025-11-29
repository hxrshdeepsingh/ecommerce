let cachedUser: any = null;

export async function getCachedUser(payload, headers) {
    if (!cachedUser) {
        const { user } = await payload.auth({ headers });
        cachedUser = user;
    }
    return cachedUser;
}
