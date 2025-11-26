// src/globals/Header.ts
import type { GlobalConfig } from 'payload';

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header Nav',
  admin: {
    group: 'Navigation',
    description: 'Main site header navigation and logo settings.',
  },
  fields: [
    {
      name: 'items',
      label: 'Navigation Items',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          required: true,
        }
      ],
    },
    {
      name: 'showSearch',
      type: 'checkbox',
      label: 'Show search icon',
      defaultValue: true,
    },
  ],
};
