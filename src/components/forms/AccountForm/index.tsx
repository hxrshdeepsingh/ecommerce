'use client'

import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { Message } from '@/components/Message'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User } from '@/payload-types'
import { useAuth } from '@/providers/Auth'
import { useRouter } from 'next/navigation'
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'

type FormData = {
  email: string
  name: User['name']
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
  // Address Fields
  addressLine1?: string
  locality?: string
  pinCode?: string
  city?: string
  state?: string
}

export const AccountForm: React.FC = () => {
  const { setUser, user } = useAuth()
  const [changePassword, setChangePassword] = useState(false)

  const {
    formState: { errors, isLoading, isSubmitting, isDirty },
    handleSubmit,
    register,
    reset,
    watch,
    setValue,
  } = useForm<FormData>()

  const password = useRef({})
  password.current = watch('password', '')

  const router = useRouter()

  const onSubmit = useCallback(
    async (data: FormData) => {
      if (user) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${user.id}`, {
          // Make sure to include cookies with fetch
          body: JSON.stringify(data),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PATCH',
        })

        if (response.ok) {
          const json = await response.json()
          setUser(json.doc)
          toast.success('Successfully updated account.')
          setChangePassword(false)
          reset({
            name: json.doc.name,
            email: json.doc.email,
            password: '',
            passwordConfirm: '',
            companyName: json.doc.companyName,
            natureOfOrganization: json.doc.natureOfOrganization,
            gstin: json.doc.gstin,
            pan: json.doc.pan,
            msmeRegistrationNo: json.doc.msmeRegistrationNo,
            ownersName: json.doc.ownersName,
            contactPersonName: json.doc.contactPersonName,
            mobileNo: json.doc.mobileNo,
            whatsappNo: json.doc.whatsappNo,
            alternateMobileNo: json.doc.alternateMobileNo,
            addressLine1: json.doc.addressLine1,
            locality: json.doc.locality,
            pinCode: json.doc.pinCode,
            city: json.doc.city,
            state: json.doc.state,
          })
        } else {
          toast.error('There was a problem updating your account.')
        }
      }
    },
    [user, setUser, reset],
  )

  useEffect(() => {
    if (user === null) {
      router.push(
        `/login?error=${encodeURIComponent(
          'You must be logged in to view this page.',
        )}&redirect=${encodeURIComponent('/account')}`,
      )
    }

    // Once user is loaded, reset form to have default values
    if (user) {
      const u = user as any
      reset({
        name: user.name,
        email: user.email,
        password: '',
        passwordConfirm: '',
        companyName: u.companyName,
        natureOfOrganization: u.natureOfOrganization,
        gstin: u.gstin,
        pan: u.pan,
        msmeRegistrationNo: u.msmeRegistrationNo,
        ownersName: u.ownersName,
        contactPersonName: u.contactPersonName,
        mobileNo: u.mobileNo,
        whatsappNo: u.whatsappNo,
        alternateMobileNo: u.alternateMobileNo,
        addressLine1: u.addressLine1,
        locality: u.locality,
        pinCode: u.pinCode,
        city: u.city,
        state: u.state,
      })
    }
  }, [user, router, reset, changePassword])

  return (
    <form className="max-w-xl" onSubmit={handleSubmit(onSubmit)}>
      {!changePassword ? (
        <Fragment>
          <div className="prose dark:prose-invert mb-8">
            <p className="">
              {'Change your account details below, or '}
              <Button
                className="px-0 text-inherit underline hover:cursor-pointer"
                onClick={() => setChangePassword(!changePassword)}
                type="button"
                variant="link"
              >
                click here
              </Button>
              {' to change your password.'}
            </p>
          </div>

          <div className="flex flex-col gap-8 mb-8">
            <FormItem>
              <Label htmlFor="email" className="mb-2">
                Email Address
              </Label>
              <Input
                id="email"
                {...register('email', { required: 'Please provide an email.' })}
                type="email"
              />
              {errors.email && <FormError message={errors.email.message} />}
            </FormItem>

            <FormItem>
              <Label htmlFor="name" className="mb-2">
                Name
              </Label>
              <Input
                id="name"
                {...register('name', { required: 'Please provide a name.' })}
                type="text"
              />
              {errors.name && <FormError message={errors.name.message} />}
            </FormItem>

            <FormItem>
              <Label className="mb-2">Account Type</Label>
              <Input
                disabled
                value={user?.roles?.join(', ') || 'customer'}
                readOnly
              />
            </FormItem>

            {/* Contact Information - Available for all */}
            <div className="flex flex-col gap-6 mb-8 mt-8 border-t pt-8">
              <h3 className="text-lg font-semibold">Contact Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormItem>
                  <Label htmlFor="mobileNo" className="mb-2">Mobile No.</Label>
                  <Input id="mobileNo" {...register('mobileNo')} />
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
            </div>

            {/* Business/Dealer Information - Visible only to Dealers */}
            {user?.roles?.includes('dealer') && (
              <div className="flex flex-col gap-6 mb-8 mt-8 border-t pt-8">
                <h3 className="text-lg font-semibold">Business Information</h3>

                <FormItem>
                  <Label htmlFor="companyName" className="mb-2">Company / Firm Name</Label>
                  <Input id="companyName" {...register('companyName')} />
                  {errors.companyName && <FormError message={errors.companyName.message} />}
                </FormItem>

                <FormItem>
                  <Label htmlFor="natureOfOrganization" className="mb-2">Nature of Organization</Label>
                  <Select onValueChange={(val) => setValue('natureOfOrganization', val)} defaultValue={(user as any)?.natureOfOrganization}>
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
                    <Input id="gstin" {...register('gstin')} />
                    {errors.gstin && <FormError message={errors.gstin.message} />}
                  </FormItem>
                  <FormItem>
                    <Label htmlFor="pan" className="mb-2">PAN</Label>
                    <Input id="pan" {...register('pan')} />
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
                    <Input id="ownersName" {...register('ownersName')} />
                    {errors.ownersName && <FormError message={errors.ownersName.message} />}
                  </FormItem>
                  <FormItem>
                    <Label htmlFor="contactPersonName" className="mb-2">Contact Person Name</Label>
                    <Input id="contactPersonName" {...register('contactPersonName')} placeholder="If other than owner" />
                  </FormItem>
                </div>
              </div>
            )}
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="prose dark:prose-invert mb-8">
            <p>
              {'Change your password below, or '}
              <Button
                className="px-0 text-inherit underline hover:cursor-pointer"
                onClick={() => setChangePassword(!changePassword)}
                type="button"
                variant="link"
              >
                cancel
              </Button>
              .
            </p>
          </div>

          <div className="flex flex-col gap-8 mb-8">
            <FormItem>
              <Label htmlFor="password" className="mb-2">
                New password
              </Label>
              <Input
                id="password"
                {...register('password', { required: 'Please provide a new password.' })}
                type="password"
              />
              {errors.password && <FormError message={errors.password.message} />}
            </FormItem>

            <FormItem>
              <Label htmlFor="passwordConfirm" className="mb-2">
                Confirm password
              </Label>
              <Input
                id="passwordConfirm"
                {...register('passwordConfirm', {
                  required: 'Please confirm your new password.',
                  validate: (value) => value === password.current || 'The passwords do not match',
                })}
                type="password"
              />
              {errors.passwordConfirm && <FormError message={errors.passwordConfirm.message} />}
            </FormItem>
          </div>
        </Fragment>
      )}
      <div className="flex flex-col gap-6 mb-8 mt-8 border-t pt-8">
        <h3 className="text-lg font-semibold">Address Details</h3>
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
      <Button disabled={isLoading || isSubmitting || !isDirty} type="submit" variant="default">
        {isLoading || isSubmitting
          ? 'Processing'
          : changePassword
            ? 'Change Password'
            : 'Update Account'}
      </Button>
    </form>
  )
}
