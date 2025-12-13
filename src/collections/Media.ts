import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  admin: {
    group: 'Content',
  },
  slug: 'media',
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    }
  ],
}
