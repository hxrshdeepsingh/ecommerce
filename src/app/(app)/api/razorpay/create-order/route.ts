import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const body = await request.json()

    const { cartId, amount, currency = 'INR', customerEmail } = body

    if (!cartId || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    })

    // Convert amount to paise (Razorpay uses smallest currency unit)
    const amountInPaise = Math.round(amount * 100)

    // Create Razorpay order
    const orderOptions: Razorpay.Orders.RazorpayOrderCreateRequestBody = {
      amount: amountInPaise,
      currency: currency,
      receipt: `cart_${cartId}_${Date.now()}`,
      notes: {
        cartId: cartId.toString(),
        customerEmail: customerEmail || '',
      },
    }

    const order = await razorpay.orders.create(orderOptions)

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    })
  } catch (error) {
    console.error('Razorpay order creation error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to create Razorpay order',
      },
      { status: 500 },
    )
  }
}

