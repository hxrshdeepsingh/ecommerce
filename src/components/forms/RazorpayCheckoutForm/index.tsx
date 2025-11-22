'use client'

import { Message } from '@/components/Message'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { useCart } from '@payloadcms/plugin-ecommerce/client/react'
import { Address } from '@/payload-types'

type Props = {
  customerEmail?: string
  billingAddress?: Partial<Address>
  orderId: string
  amount: number
  currency?: string
  setProcessingPayment: React.Dispatch<React.SetStateAction<boolean>>
}

export const RazorpayCheckoutForm: React.FC<Props> = ({
  customerEmail,
  billingAddress,
  orderId,
  amount,
  currency = 'INR',
  setProcessingPayment,
}) => {
  const [error, setError] = useState<null | string>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false)
  const router = useRouter()
  const { clearCart, cart } = useCart()

  useEffect(() => {
    // Load Razorpay script
    const loadRazorpay = async () => {
      if (window.Razorpay) {
        setIsRazorpayLoaded(true)
        return
      }

      return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script')
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        script.async = true
        script.onload = () => {
          setIsRazorpayLoaded(true)
          resolve()
        }
        script.onerror = () => {
          const errorMsg = 'Failed to load Razorpay script'
          setError(errorMsg)
          reject(new Error(errorMsg))
        }
        document.body.appendChild(script)
      })
    }

    loadRazorpay().catch((err) => {
      setError(err instanceof Error ? err.message : 'Failed to load Razorpay')
      setIsRazorpayLoaded(false)
    })
  }, [])

  const handlePayment = useCallback(async () => {
    if (!window.Razorpay || !isRazorpayLoaded) {
      setError('Razorpay script not loaded. Please refresh the page.')
      return
    }

    setIsLoading(true)
    setProcessingPayment(true)
    setError(null)

    try {
      const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID

      if (!razorpayKeyId) {
        throw new Error('Razorpay key ID not configured')
      }

      const customerName = billingAddress
        ? `${billingAddress.firstName || ''} ${billingAddress.lastName || ''}`.trim()
        : ''

      const razorpayOptions = {
        key: razorpayKeyId,
        amount: Math.round(amount * 100), // Convert to paise
        currency: currency,
        name: 'Store',
        description: 'Order Payment',
        order_id: orderId,
        handler: async function (response: {
          razorpay_payment_id: string
          razorpay_order_id: string
          razorpay_signature: string
        }) {
          try {
            // Verify payment with backend
            const verifyResponse = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
                cartId: cart?.id,
                customerEmail: customerEmail,
              }),
            })

            const verifyData = await verifyResponse.json()

            if (!verifyResponse.ok || !verifyData.success) {
              throw new Error(verifyData.error || 'Payment verification failed')
            }

            // Create order using custom API endpoint
            const orderResponse = await fetch('/api/razorpay/create-order-from-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                cartId: cart?.id,
                customerEmail: customerEmail,
                amount: verifyData.amount,
                currency: verifyData.currency || 'INR',
              }),
            })

            const orderData = await orderResponse.json()

            if (!orderResponse.ok || !orderData.success) {
              throw new Error(orderData.error || 'Failed to create order')
            }

            // Clear the cart after successful payment
            clearCart()

            // Redirect to order confirmation page
            const redirectUrl = `/orders/${orderData.orderID}${customerEmail ? `?email=${customerEmail}` : ''}`
            router.push(redirectUrl)
          } catch (err) {
            console.error('Payment confirmation error:', err)
            const msg = err instanceof Error ? err.message : 'Something went wrong.'
            setError(`Error while confirming payment: ${msg}`)
            setIsLoading(false)
            setProcessingPayment(false)
          }
        },
        prefill: {
          name: customerName || '',
          email: customerEmail || '',
          contact: billingAddress?.phone || '',
        },
        theme: {
          color: '#3399cc',
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false)
            setProcessingPayment(false)
            setError('Payment cancelled by user')
          },
        },
      }
      const razorpay = new window.Razorpay(razorpayOptions)

      // Add error handler
      razorpay.on('payment.failed', function (response: any) {
        console.error('Razorpay payment failed:', response)
        setError(`Payment failed: ${response.error?.description || 'Unknown error'}`)
        setIsLoading(false)
        setProcessingPayment(false)
      })

      razorpay.open()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.'
      setError(`Error while initiating payment: ${msg}`)
      setIsLoading(false)
      setProcessingPayment(false)
    }
  }, [
    amount,
    currency,
    orderId,
    customerEmail,
    billingAddress,
    cart,
    clearCart,
    router,
    setProcessingPayment,
    isRazorpayLoaded,
  ])

  return (
    <div className="flex flex-col gap-4">
      {error && <Message error={error} />}
      {!isRazorpayLoaded && !error && (
        <p className="text-sm text-muted-foreground">Loading Razorpay...</p>
      )}
      <Button
        disabled={isLoading || !isRazorpayLoaded || !window.Razorpay}
        onClick={handlePayment}
        type="button"
        variant="default"
        className="w-full"
      >
        {isLoading ? 'Processing...' : isRazorpayLoaded ? 'Pay with Razorpay' : 'Loading...'}
      </Button>
      <p className="text-sm text-muted-foreground">
        You will be redirected to Razorpay's secure payment page to complete your payment.
      </p>
    </div>
  )
}

declare global {
  interface Window {
    Razorpay: any
  }
}

