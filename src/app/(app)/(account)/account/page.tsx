// import type { Metadata } from 'next';
// import { Button } from '@/components/ui/button';
// import { mergeOpenGraph } from '@/utilities/mergeOpenGraph';
// import Link from 'next/link';
// import { headers as getHeaders } from 'next/headers';
// import { AccountForm } from '@/components/forms/AccountForm';
// import { Order } from '@/payload-types';
// import { OrderItem } from '@/components/OrderItem';
// import { redirect } from 'next/navigation';
// // import { getAuthUser } from '@/utilities/auth';
// // import { getPayload } from 'payload';
// // import configPromise from '@payload-config';

// import { getPayloadClient } from '@/utilities/getPayloadCached'
// import { getCachedUser } from '@/utilities/getCachedUser'

// export default async function AccountPage() {
//   const headers = await getHeaders();
//   const payload = await getPayloadClient();
//   const user = await getCachedUser(payload, headers);



//   if (!user) {
//     redirect(`/login?warning=${encodeURIComponent('Please login to access your account settings.')}`);
//   }



//   let orders: Order[] | null = null;
//   try {
//     const ordersResult = await payload.find({
//       collection: 'orders',
//       limit: 5,
//       user,
//       overrideAccess: false,
//       pagination: false,
//       where: { customer: { equals: user?.id } },
//     });
//     orders = ordersResult?.docs || [];
//   } catch (error) {
//     // swallow errors in dev
//   }

//   return (
//     <>
//       <div className="border p-8 rounded-lg bg-accent">
//         <h1 className="text-3xl font-medium mb-8">Account settings</h1>
//         <AccountForm />
//       </div>
//       <div className="border p-8 rounded-lg bg-accent">
//         <h2 className="text-3xl font-medium mb-8">Recent Orders</h2>
//         <div className="prose mb-8">
//           <p>
//             These are the most recent orders you have placed. Each order is associated with a payment. As you place more orders, they will appear in your orders list.
//           </p>
//         </div>
//         {(!orders || !Array.isArray(orders) || orders?.length === 0) && (
//           <p className="mb-8">You have no orders.</p>
//         )}
//         {orders && orders.length > 0 && (
//           <ul className="flex flex-col gap-6 mb-8">
//             {orders.map((order) => (
//               <li key={order.id}>
//                 <OrderItem order={order} />
//               </li>
//             ))}
//           </ul>
//         )}
//         <Button asChild variant="default">
//           <Link href="/orders">View all orders</Link>
//         </Button>
//       </div>
//     </>
//   );
// }

// export const metadata: Metadata = {
//   description: 'Create an account or log in to your existing account.',
//   openGraph: mergeOpenGraph({ title: 'Account', url: '/account' }),
//   title: 'Account',
// };
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph';
import Link from 'next/link';
import { headers as getHeaders } from 'next/headers';
import { AccountForm } from '@/components/forms/AccountForm';
import { OrderItem } from '@/components/OrderItem';
import { redirect } from 'next/navigation';

import { getPayloadClient } from '@/utilities/getPayloadCached';
import { getCachedUser } from '@/utilities/getCachedUser';
import { getCachedOrders } from '@/utilities/getCachedOrders';

export default async function AccountPage() {
  const headers = await getHeaders();
  const payload = await getPayloadClient();
  const user = await getCachedUser(payload, headers);

  if (!user) {
    redirect(`/login?warning=${encodeURIComponent('Please login to access your account settings.')}`);
  }

  const orders = await getCachedOrders(payload, user.id);

  return (
    <>
      <div className="border p-8 rounded-lg bg-accent">
        <h1 className="text-3xl font-medium mb-8">Account settings</h1>
        <AccountForm />
      </div>

      <div className="border p-8 rounded-lg bg-accent">
        <h2 className="text-3xl font-medium mb-8">Recent Orders</h2>

        <div className="prose mb-8">
          <p>These are the most recent orders you have placed.</p>
        </div>

        {orders.length === 0 && <p className="mb-8">You have no orders.</p>}

        {orders.length > 0 && (
          <ul className="flex flex-col gap-6 mb-8">
            {orders.map((order) => (
              <li key={order.id}>
                <OrderItem order={order} />
              </li>
            ))}
          </ul>
        )}

        <Button asChild variant="default">
          <Link href="/orders">View all orders</Link>
        </Button>
      </div>
    </>
  );
}

export const metadata: Metadata = {
  description: 'Create an account or log in to your existing account.',
  openGraph: mergeOpenGraph({ title: 'Account', url: '/account' }),
  title: 'Account',
};
