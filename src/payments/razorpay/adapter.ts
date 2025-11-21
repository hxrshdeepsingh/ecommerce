import type { PaymentAdapter } from '@payloadcms/plugin-ecommerce/types'
import Razorpay from 'razorpay'
import crypto from 'crypto'

export interface RazorpayAdapterConfig {
  keyId: string
  keySecret: string
  webhookSecret: string
}

export function razorpayAdapter(config: RazorpayAdapterConfig): PaymentAdapter {
  const razorpay = new Razorpay({
    key_id: config.keyId,
    key_secret: config.keySecret,
  })

  return {
    slug: 'razorpay',
    initiatePayment: async ({ amount, currency, transaction, additionalData }) => {
      try {
        // Convert amount to paise (Razorpay uses smallest currency unit)
        const amountInPaise = Math.round((amount || 0) * 100)

        const orderOptions: Razorpay.Orders.RazorpayOrderCreateRequestBody = {
          amount: amountInPaise,
          currency: currency || 'INR',
          receipt: `txn_${transaction.id}_${Date.now()}`,
          notes: {
            transactionId: transaction.id.toString(),
            customerEmail: additionalData?.customerEmail || '',
          },
        }

        const order = await razorpay.orders.create(orderOptions)

        return {
          id: order.id,
          clientSecret: order.id, // Razorpay uses order ID instead of client secret
          orderId: order.id,
        }
      } catch (error) {
        console.error('Razorpay order creation error:', error)
        throw new Error(
          error instanceof Error ? error.message : 'Failed to create Razorpay order',
        )
      }
    },
    confirmPayment: async ({ transaction, additionalData }) => {
      try {
        const paymentId = additionalData?.paymentId as string
        const orderId = additionalData?.orderId as string
        const signature = additionalData?.signature as string

        if (!paymentId || !orderId || !signature) {
          throw new Error('Missing payment verification data')
        }

        // Verify the signature using KEY_SECRET (not webhook secret)
        // Payment signatures must be verified with keySecret
        const text = `${orderId}|${paymentId}`
        const generatedSignature = crypto
          .createHmac('sha256', config.keySecret)
          .update(text)
          .digest('hex')

        if (generatedSignature !== signature) {
          throw new Error('Invalid payment signature')
        }

        // Fetch payment details from Razorpay
        const payment = await razorpay.payments.fetch(paymentId)

        if (payment.status === 'captured' || payment.status === 'authorized') {
          return {
            transactionID: paymentId,
            orderID: orderId,
          }
        }

        throw new Error(`Payment not successful. Status: ${payment.status}`)
      } catch (error) {
        console.error('Razorpay payment confirmation error:', error)
        throw new Error(
          error instanceof Error ? error.message : 'Failed to confirm Razorpay payment',
        )
      }
    },
    handleWebhook: async ({ payload, headers }) => {
      try {
        const signature = headers['x-razorpay-signature'] as string

        if (!signature) {
          throw new Error('Missing webhook signature')
        }

        // Verify webhook signature
        const text = JSON.stringify(payload)
        const generatedSignature = crypto
          .createHmac('sha256', config.webhookSecret)
          .update(text)
          .digest('hex')

        if (generatedSignature !== signature) {
          throw new Error('Invalid webhook signature')
        }

        const event = payload as Razorpay.Webhooks.WebhookPayload

        return {
          event: event.event,
          data: event.payload,
        }
      } catch (error) {
        console.error('Razorpay webhook error:', error)
        throw new Error(
          error instanceof Error ? error.message : 'Failed to handle Razorpay webhook',
        )
      }
    },
  }
}

