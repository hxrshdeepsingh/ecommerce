import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import crypto from 'crypto'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const body = await request.json()

    const { paymentId, orderId, signature, cartId, customerEmail } = body

    if (!paymentId || !orderId || !signature) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Verify the signature using KEY_SECRET (not webhook secret)
    // Payment signatures must be verified with RAZORPAY_KEY_SECRET
    const text = `${orderId}|${paymentId}`
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(text)
      .digest('hex')

    if (generatedSignature !== signature) {
      console.error('Signature verification failed:', {
        expected: generatedSignature,
        received: signature,
        text,
        hasSecret: !!process.env.RAZORPAY_KEY_SECRET,
      })
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 })
    }

    // Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    })

    // Fetch payment details from Razorpay
    const payment = await razorpay.payments.fetch(paymentId)

    if (payment.status === 'captured' || payment.status === 'authorized') {
      // Find the cart and create order
      if (cartId) {
        const cart = await payload.findByID({
          collection: 'carts',
          id: cartId,
        })

        if (cart && cart.items && cart.items.length > 0) {
          // Use the ecommerce plugin's order creation
          // This will be handled by the confirmOrder function on the client
          return NextResponse.json({
            success: true,
            paymentId: paymentId,
            orderId: orderId,
            amount: payment.amount / 100, // Convert from paise
            currency: payment.currency,
          })
        }
      }

      return NextResponse.json({
        success: true,
        paymentId: paymentId,
        orderId: orderId,
        amount: payment.amount / 100,
        currency: payment.currency,
      })
    }

    return NextResponse.json(
      { error: `Payment not successful. Status: ${payment.status}` },
      { status: 400 },
    )
  } catch (error) {
    console.error('Razorpay payment verification error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to verify Razorpay payment',
      },
      { status: 500 },
    )
  }
}

