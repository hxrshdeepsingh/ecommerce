import type { PaymentAdapterClient } from '@payloadcms/plugin-ecommerce/client/react'

export interface RazorpayAdapterClientConfig {
  keyId: string
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export function razorpayAdapterClient(
  config: RazorpayAdapterClientConfig,
): PaymentAdapterClient {
  const loadRazorpayScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (window.Razorpay) {
        resolve()
        return
      }

      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('Failed to load Razorpay script'))
      document.body.appendChild(script)
    })
  }

  return {
    slug: 'razorpay',
    initiatePayment: async (paymentID, options) => {
      // The server will create the order and return order details
      // This is handled by the server-side adapter
      return options as Record<string, unknown>
    },
    confirmPayment: async (paymentID, options) => {
      await loadRazorpayScript()

      return new Promise((resolve, reject) => {
        const { orderId, amount, currency, customerEmail, customerName, customerPhone } =
          options.additionalData as {
            orderId: string
            amount: number
            currency: string
            customerEmail?: string
            customerName?: string
            customerPhone?: string
          }

        const razorpayOptions = {
          key: config.keyId,
          amount: Math.round(amount * 100), // Convert to paise
          currency: currency || 'INR',
          name: 'Store',
          description: 'Order Payment',
          order_id: orderId,
          handler: function (response: {
            razorpay_payment_id: string
            razorpay_order_id: string
            razorpay_signature: string
          }) {
            resolve({
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
            })
          },
          prefill: {
            name: customerName || '',
            email: customerEmail || '',
            contact: customerPhone || '',
          },
          theme: {
            color: '#3399cc',
          },
          modal: {
            ondismiss: function () {
              reject(new Error('Payment cancelled by user'))
            },
          },
        }

        const razorpay = new window.Razorpay(razorpayOptions)
        razorpay.open()
      })
    },
  }
}

