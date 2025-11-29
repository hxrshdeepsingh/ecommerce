import { Order } from '@/payload-types';

let cachedOrders: Order[] | null = null;

export async function getCachedOrders(payload: any, userId: string) {
    if (!cachedOrders) {
        const result = await payload.find({
            collection: 'orders',
            limit: 5,
            user: { id: userId },
            overrideAccess: false,
            pagination: false,
            where: { customer: { equals: userId } },
        });

        cachedOrders = result?.docs || [];
    }

    return cachedOrders;
}
