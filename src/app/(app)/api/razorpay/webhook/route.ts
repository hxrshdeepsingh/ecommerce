import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const body = await request.json()
    const signature = request.headers.get('x-razorpay-signature')

    if (!signature) {
      return NextResponse.json({ error: 'Missing webhook signature' }, { status: 400 })
    }

    // Verify webhook signature
    const text = JSON.stringify(body)
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(text)
      .digest('hex')

    if (generatedSignature !== signature) {
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 })
    }

    const event = body.event
    const paymentData = body.payload?.payment?.entity

    if (event === 'payment.captured' || event === 'payment.authorized') {
      // Handle successful payment
      // You can update order status, send confirmation emails, etc.
      console.log('Payment successful:', paymentData)
    } else if (event === 'payment.failed') {
      // Handle failed payment
      console.log('Payment failed:', paymentData)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Razorpay webhook error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to handle Razorpay webhook',
      },
      { status: 500 },
    )
  }
}

