import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const body = await request.json()

    const { paymentId, orderId, cartId, customerEmail, amount, currency } = body

    if (!paymentId || !orderId || !cartId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Fetch the cart
    const cart = await payload.findByID({
      collection: 'carts',
      id: cartId,
    })

    if (!cart || !cart.items || cart.items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty or not found' }, { status: 400 })
    }

    // Create a transaction
    const transaction = await payload.create({
      collection: 'transactions',
      data: {
        items: cart.items.map((item) => ({
          product: item.product,
          variant: item.variant
            ? typeof item.variant === 'object'
              ? item.variant.id
              : item.variant
            : null,
          quantity: item.quantity || 1,
        })),
        // paymentMethod: 'stripe',
        status: 'succeeded',
        amount: amount || cart.subtotal || 0,
        currency: "USD",
        customerEmail: customerEmail || null,
        cart: cartId,
      },
    })

    // Create the order
    // const order = await payload.create({
    //   collection: 'orders',
    //   data: {
    //     items: cart.items.map((item) => ({
    //       product: item.product,
    //       variant: item.variant
    //         ? typeof item.variant === 'object'
    //           ? item.variant.id
    //           : item.variant
    //         : null,
    //       quantity: item.quantity || 1,
    //     })),
    //     // total: cart.subtotal,
    //     status: 'processing',
    //     customerEmail: customerEmail || null,
    //     // transaction: transaction.id,
    //   },
    // })
    const order = await payload.create({
      collection: 'orders',
      data: {
        items: cart.items.map((item) => ({
          product: item.product,
          variant: item.variant
            ? typeof item.variant === 'object'
              ? item.variant.id
              : item.variant
            : null,
          quantity: item.quantity || 1,
        })),
        status: 'processing',
        customerEmail: typeof cart.customer === 'object' ? cart.customer?.email ?? "" : "",
        customer: typeof cart.customer === 'number' ? cart.customer : (cart.customer?.id ?? null),
        transactions: [transaction.id],
      },
    })

    // Clear the cart
    await payload.update({
      collection: 'carts',
      id: cartId,
      data: {
        items: [],
      },
    })

    return NextResponse.json({
      success: true,
      orderID: order.id,
      transactionID: transaction.id,
    })
  } catch (error) {
    console.error('Razorpay order creation error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to create order',
      },
      { status: 500 },
    )
  }
}

