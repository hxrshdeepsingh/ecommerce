'use client'

import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { Message } from '@/components/Message'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAuth } from '@/providers/Auth'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  email: string
  password: string
  passwordConfirm: string
  // Dealer fields
  companyName?: string
  natureOfOrganization?: string
  gstin?: string
  pan?: string
  msmeRegistrationNo?: string
  ownersName?: string
  contactPersonName?: string
  mobileNo?: string
  whatsappNo?: string
  alternateMobileNo?: string
  // Files - handled separately but part of form
  gstCertificate?: FileList
  ownersID?: FileList
  // Address Fields
  addressLine1?: string
  locality?: string
  pinCode?: string
  city?: string
  state?: string
}

export const CreateAccountForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const { login } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const [accountType, setAccountType] = useState<'customer' | 'dealer'>('customer')

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
    setValue,
  } = useForm<FormData>()

  const password = useRef({})
  password.current = watch('password', '')

  const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    // In Payload, media upload is usually a POST to the collection slug
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/media`, {
      method: 'POST',
      body: formData,
    })

    if (!res.ok) {
      throw new Error('Failed to upload file')
    }

    const json = await res.json()
    return json.doc.id
  }

  const onSubmit = useCallback(
    async (data: FormData) => {
      setLoading(true)
      setError(null)

      try {
        let gstCertificateID = null
        let ownersIDID = null

        if (accountType === 'dealer') {
          if (data.gstCertificate && data.gstCertificate.length > 0) {
            gstCertificateID = await uploadFile(data.gstCertificate[0])
          }
          if (data.ownersID && data.ownersID.length > 0) {
            ownersIDID = await uploadFile(data.ownersID[0])
          }
        }

        const payload = {
          email: data.email,
          password: data.password,
          roles: [accountType],
          ...(accountType === 'dealer' && {
            companyName: data.companyName,
            natureOfOrganization: data.natureOfOrganization,
            gstin: data.gstin,
            pan: data.pan,
            msmeRegistrationNo: data.msmeRegistrationNo,
            ownersName: data.ownersName,
            contactPersonName: data.contactPersonName,
            mobileNo: data.mobileNo,
            whatsappNo: data.whatsappNo,
            alternateMobileNo: data.alternateMobileNo,
            // Attach uploaded file IDs
            ...(gstCertificateID && { gstCertificate: gstCertificateID }),
            ...(ownersIDID && { ownersID: ownersIDID }),
          })
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, {
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })

        if (!response.ok) {
          const message = response.statusText || 'There was an error creating the account.'
          setError(message)
          setLoading(false)
          return
        }

        const redirect = searchParams.get('redirect')

        // Login automatically
        await login({ email: data.email, password: data.password })

        if (redirect) router.push(redirect)
        else router.push(`/account?success=${encodeURIComponent('Account created successfully')}`)

      } catch (err) {
        setLoading(false)
        setError('There was an error creating the account. Please check your inputs and try again.')
        console.error(err)
      }
    },
    [login, router, searchParams, accountType],
  )

  return (
    <form className="max-w-xl py-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="prose dark:prose-invert mb-6">
        <p>
          {`This is where new customers can signup and create a new account. To manage all users, `}
          <Link href="/admin/collections/users">login to the admin dashboard</Link>.
        </p>
      </div>

      <Message error={error} />

      <div className="flex flex-col gap-6 mb-8">

        {/* Account Type Selection */}
        <FormItem>
          <Label>Account Type</Label>
          <div className="flex gap-4">
            <Button
              type="button"
              variant={accountType === 'customer' ? 'default' : 'outline'}
              onClick={() => setAccountType('customer')}
            >
              Customer
            </Button>
            <Button
              type="button"
              variant={accountType === 'dealer' ? 'default' : 'outline'}
              onClick={() => setAccountType('dealer')}
            >
              Dealer
            </Button>
          </div>
        </FormItem>

        <FormItem>
          <Label htmlFor="email" className="mb-2">
            Email Address
          </Label>
          <Input
            id="email"
            {...register('email', { required: 'Email is required.' })}
            type="email"
          />
          {errors.email && <FormError message={errors.email.message} />}
        </FormItem>

        <FormItem>
          <Label htmlFor="password" className="mb-2">
            New password
          </Label>
          <Input
            id="password"
            {...register('password', { required: 'Password is required.' })}
            type="password"
          />
          {errors.password && <FormError message={errors.password.message} />}
        </FormItem>

        <FormItem>
          <Label htmlFor="passwordConfirm" className="mb-2">
            Confirm Password
          </Label>
          <Input
            id="passwordConfirm"
            {...register('passwordConfirm', {
              required: 'Please confirm your password.',
              validate: (value) => value === password.current || 'The passwords do not match',
            })}
            type="password"
          />
          {errors.passwordConfirm && <FormError message={errors.passwordConfirm.message} />}
        </FormItem>

        {accountType === 'dealer' && (
          <>
            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-semibold mb-4">Dealer Information</h3>
            </div>

            <FormItem>
              <Label htmlFor="companyName" className="mb-2">Company / Firm Name</Label>
              <Input id="companyName" {...register('companyName', { required: 'Company name is required for dealers.' })} />
              {errors.companyName && <FormError message={errors.companyName.message} />}
            </FormItem>

            <FormItem>
              <Label htmlFor="natureOfOrganization" className="mb-2">Nature of Organization</Label>
              <Select onValueChange={(val) => setValue('natureOfOrganization', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Organization Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="proprietorship">Proprietorship</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                  <SelectItem value="llp">LLP</SelectItem>
                  <SelectItem value="pvt_ltd">Private Limited</SelectItem>
                  <SelectItem value="public_ltd">Public Limited</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormItem>
                <Label htmlFor="gstin" className="mb-2">GSTIN</Label>
                <Input id="gstin" {...register('gstin', { required: 'GSTIN is required.' })} />
                {errors.gstin && <FormError message={errors.gstin.message} />}
              </FormItem>
              <FormItem>
                <Label htmlFor="pan" className="mb-2">PAN</Label>
                <Input id="pan" {...register('pan', { required: 'PAN is required.' })} />
                {errors.pan && <FormError message={errors.pan.message} />}
              </FormItem>
              <FormItem>
                <Label htmlFor="msmeRegistrationNo" className="mb-2">MSME Registration No.</Label>
                <Input id="msmeRegistrationNo" {...register('msmeRegistrationNo')} />
              </FormItem>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormItem>
                <Label htmlFor="ownersName" className="mb-2">Owner's Name</Label>
                <Input id="ownersName" {...register('ownersName', { required: 'Owner Name is required.' })} />
                {errors.ownersName && <FormError message={errors.ownersName.message} />}
              </FormItem>
              <FormItem>
                <Label htmlFor="contactPersonName" className="mb-2">Contact Person Name</Label>
                <Input id="contactPersonName" {...register('contactPersonName')} placeholder="If other than owner" />
              </FormItem>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormItem>
                <Label htmlFor="mobileNo" className="mb-2">Mobile No.</Label>
                <Input id="mobileNo" {...register('mobileNo', { required: 'Mobile No is required.' })} />
                {errors.mobileNo && <FormError message={errors.mobileNo.message} />}
              </FormItem>
              <FormItem>
                <Label htmlFor="whatsappNo" className="mb-2">WhatsApp No.</Label>
                <Input id="whatsappNo" {...register('whatsappNo')} />
              </FormItem>
              <FormItem>
                <Label htmlFor="alternateMobileNo" className="mb-2">Alternate Mobile No.</Label>
                <Input id="alternateMobileNo" {...register('alternateMobileNo')} />
              </FormItem>
            </div>

            {/* <FormItem>
              <Label htmlFor="gstCertificate" className="mb-2">GST Certificate / MSME (Upload)</Label>
              <Input id="gstCertificate" type="file" {...register('gstCertificate', { required: 'Certificate is required' })} />
              {errors.gstCertificate && <FormError message={errors.gstCertificate.message} />}
            </FormItem>

            <FormItem>
              <Label htmlFor="ownersID" className="mb-2">Owner's ID (Aadhar / DL) (Upload)</Label>
              <Input id="ownersID" type="file" {...register('ownersID', { required: 'ID Proof is required' })} />
              {errors.ownersID && <FormError message={errors.ownersID.message} />}
            </FormItem> */}
          </>
        )}

      </div>
      <div className="flex flex-col gap-6 mb-8">
        <div className="border-b pb-4 mb-4">
          <h3 className="text-lg font-semibold">Address Details</h3>
        </div>
        <FormItem>
          <Label htmlFor="addressLine1" className="mb-2">Address</Label>
          <Input id="addressLine1" {...register('addressLine1')} />
        </FormItem>
        <FormItem>
          <Label htmlFor="locality" className="mb-2">Locality/Landmark</Label>
          <Input id="locality" {...register('locality')} />
        </FormItem>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormItem>
            <Label htmlFor="pinCode" className="mb-2">PIN Code</Label>
            <Input id="pinCode" {...register('pinCode')} />
          </FormItem>
          <FormItem>
            <Label htmlFor="city" className="mb-2">City</Label>
            <Input id="city" {...register('city')} />
          </FormItem>
          <FormItem>
            <Label htmlFor="state" className="mb-2">State</Label>
            <Input id="state" {...register('state')} />
          </FormItem>
        </div>
      </div>

      <Button disabled={loading} type="submit" variant="default" className="w-full">
        {loading ? 'Processing...' : 'Create Account'}
      </Button>

      <div className="prose dark:prose-invert mt-8 text-center hidden">
        {/* Hidden as request didn't ask for it, but keeping standard layout */}
      </div>

      <div className="prose dark:prose-invert mt-8">
        <p>
          {'Already have an account? '}
          <Link href={`/login${allParams}`}>Login</Link>
        </p>
      </div>
    </form>
  )
}
