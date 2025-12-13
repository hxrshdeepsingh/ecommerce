import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { adminOnlyFieldAccess } from '@/access/adminOnlyFieldAccess'
import { publicAccess } from '@/access/publicAccess'
import { adminOrSelf } from '@/access/adminOrSelf'
import { checkRole } from '@/access/utilities'

import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: ({ req: { user } }) => checkRole(['admin'], user),
    create: publicAccess,
    delete: adminOnly,
    read: adminOrSelf,
    update: adminOrSelf,
  },
  admin: {
    group: 'Users',
    defaultColumns: ['name', 'email', 'roles'],
    useAsTitle: 'name',
  },
  auth: {
    tokenExpiration: 1209600,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      access: {
        read: adminOnlyFieldAccess,
        create: () => true,
        update: adminOnlyFieldAccess,
      },
      defaultValue: ['customer'],
      hasMany: true,
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      options: [
        {
          label: 'admin',
          value: 'admin',
        },
        {
          label: 'customer',
          value: 'customer',
        },
        {
          label: 'dealer',
          value: 'dealer',
        },
      ],
    },
    {
      name: 'companyName',
      type: 'text',
      admin: {
        condition: (data) => data?.roles?.includes('dealer'),
      },
    },
    {
      name: 'natureOfOrganization',
      type: 'select',
      options: [
        { label: 'Proprietorship', value: 'proprietorship' },
        { label: 'Partnership', value: 'partnership' },
        { label: 'LLP', value: 'llp' },
        { label: 'Private Limited', value: 'pvt_ltd' },
        { label: 'Public Limited', value: 'public_ltd' },
      ],
      admin: {
        condition: (data) => data?.roles?.includes('dealer'),
      },
    },
    {
      name: 'gstin',
      type: 'text',
      admin: {
        condition: (data) => data?.roles?.includes('dealer'),
      },
    },
    {
      name: 'pan',
      type: 'text',
      admin: {
        condition: (data) => data?.roles?.includes('dealer'),
      },
    },
    {
      name: 'msmeRegistrationNo',
      type: 'text',
      admin: {
        condition: (data) => data?.roles?.includes('dealer'),
      },
    },
    {
      name: 'ownersName',
      type: 'text',
      admin: {
        condition: (data) => data?.roles?.includes('dealer'),
      },
    },
    {
      name: 'contactPersonName',
      type: 'text',
      admin: {
        condition: (data) => data?.roles?.includes('dealer'),
      },
    },
    {
      name: 'mobileNo',
      type: 'text',
      admin: {
        condition: (data) => data?.roles?.includes('dealer'),
      },
    },
    {
      name: 'whatsappNo',
      type: 'text',
      admin: {
        condition: (data) => data?.roles?.includes('dealer'),
      },
    },
    {
      name: 'alternateMobileNo',
      type: 'text',
      admin: {
        condition: (data) => data?.roles?.includes('dealer'),
      },
    },
    {
      name: 'gstCertificate',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (data) => data?.roles?.includes('dealer'),
      },
    },
    {
      name: 'ownersID',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (data) => data?.roles?.includes('dealer'),
      },
    },
    // Address Fields
    {
      name: 'addressLine1',
      type: 'text',
      label: 'Address',
    },
    {
      name: 'locality',
      type: 'text',
      label: 'Locality/Landmark',
    },
    {
      name: 'pinCode',
      type: 'text',
      label: 'PIN Code',
    },
    {
      name: 'city',
      type: 'text',
      label: 'City',
    },
    {
      name: 'state',
      type: 'text',
      label: 'State',
    },
    {
      name: 'orders',
      type: 'join',
      collection: 'orders',
      on: 'customer',
      admin: {
        allowCreate: false,
        defaultColumns: ['id', 'createdAt', 'total', 'currency', 'items'],
      },
    },
    {
      name: 'cart',
      type: 'join',
      collection: 'carts',
      on: 'customer',
      admin: {
        allowCreate: false,
        defaultColumns: ['id', 'createdAt', 'total', 'currency', 'items'],
      },
    },
    {
      name: 'addresses',
      type: 'join',
      collection: 'addresses',
      on: 'customer',
      admin: {
        allowCreate: false,
        defaultColumns: ['id'],
      },
    },
  ],
}
