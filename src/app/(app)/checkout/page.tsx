import type { Metadata } from 'next'

import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import React, { Fragment } from 'react'

import { CheckoutPage } from '@/components/checkout/CheckoutPage'

export default function Checkout() {
  return (
    <div className="container min-h-[90vh] flex">
      {!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID && (
        <div>
          <Fragment>
            {'To enable checkout, you must configure Razorpay. Please set '}
            <code>NEXT_PUBLIC_RAZORPAY_KEY_ID</code>
            {' and '}
            <code>RAZORPAY_KEY_SECRET</code>
            {' in your environment variables.'}
          </Fragment>
        </div>
      )}

      <h1 className="sr-only">Checkout</h1>

      <CheckoutPage />
    </div>
  )
}

export const metadata: Metadata = {
  description: 'Checkout.',
  openGraph: mergeOpenGraph({
    title: 'Checkout',
    url: '/checkout',
  }),
  title: 'Checkout',
}
