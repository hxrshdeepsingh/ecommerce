# Ecommerce Store - Project Documentation

## Project Overview

**Name:** Store  
**Version:** 1.0.0  
**Description:** Ecommerce template for Payload CMS  
**License:** MIT  
**Framework:** Next.js 15.2.3 with React 19.2.0

---

## Technology Stack

### Core Technologies
- **Frontend Framework:** Next.js 15.2.3
- **React Version:** 19.2.0
- **TypeScript:** 5.9.3
- **CMS:** Payload CMS 3.64.0
- **Database:** PostgreSQL (via @payloadcms/db-postgres)
- **Node Version:** ^18.20.2 || >=20.9.0

### Styling & UI
- **CSS Framework:** Tailwind CSS 4.1.17
- **UI Components:** Radix UI (comprehensive component library)
- **Animations:** tailwindcss-animate 1.0.7
- **Icons:** Lucide React 0.554.0
- **Theming:** next-themes 0.4.6

### Payment Integration
- **Stripe:** @stripe/stripe-js ^8.5.2, @stripe/react-stripe-js ^5
- **Razorpay:** 2.9.6

### Additional Libraries
- **Forms:** react-hook-form 7.66.1
- **Date Handling:** date-fns 4.1.0
- **Carousel:** embla-carousel-react 8.6.0
- **Notifications:** sonner 2.0.7
- **Charts:** recharts 2.15.4
- **GraphQL:** graphql 16.12.0

---

## Pages & Routes

### Total Pages: 14 (User-facing) + 1 (Admin)

#### Public Pages (9)

2. **Shop** - `/shop` (`src/app/(app)/shop/page.tsx`)
3. **Product Detail** - `/products/[slug]` (`src/app/(app)/products/[slug]/page.tsx`)

1. **Home** - `/` (`src/app/(app)/page.tsx`)
4. **About** - `/about` (`src/app/(app)/about/page.tsx`)
5. **Contact** - `/contact` (`src/app/(app)/contact/page.tsx`)

6. **Login** - `/login` (`src/app/(app)/login/page.tsx`)
7. **Create Account** - `/create-account` (`src/app/(app)/create-account/page.tsx`)
8. **Forgot Password** - `/forgot-password` (`src/app/(app)/forgot-password/page.tsx`)
9. **Find Order** - `/find-order` (`src/app/(app)/find-order/page.tsx`)
10. **Account** - `/account` (`src/app/(app)/(account)/account/page.tsx`)
11. **Orders** - `/orders` (`src/app/(app)/(account)/orders/page.tsx`)

#### Authenticated Pages (4)
12. **Checkout** - `/checkout` (`src/app/(app)/checkout/page.tsx`)
13. **Confirm Order** - `/checkout/confirm-order` (`src/app/(app)/checkout/confirm-order/page.tsx`)
14. **Logout** - `/logout` (`src/app/(app)/logout/page.tsx`)

#### Admin Panel (1)
15. **Payload Admin** - `/admin/[[...segments]]` (`src/app/(payload)/admin/[[...segments]]/page.tsx`)

### Special Pages
- **404 Not Found** - `src/app/(app)/not-found.tsx`
- **Error Page** - `src/app/(app)/error.tsx`

---

## Project Structure

```
ecommerce/
├── src/
│   ├── app/
│   │   ├── (app)/              # Main application routes
│   │   │   ├── (account)/      # Account-related pages
│   │   │   ├── about/
│   │   │   ├── api/            # API routes
│   │   │   ├── checkout/
│   │   │   ├── contact/
│   │   │   ├── create-account/
│   │   │   ├── find-order/
│   │   │   ├── forgot-password/
│   │   │   ├── login/
│   │   │   ├── logout/
│   │   │   ├── products/
│   │   │   ├── shop/
│   │   │   ├── globals.css     # Global styles
│   │   │   ├── layout.tsx      # Root layout
│   │   │   └── page.tsx        # Home page
│   │   └── (payload)/          # Payload CMS admin
│   │       └── admin/
│   ├── access/                 # Access control logic
│   ├── blocks/                 # Reusable content blocks
│   ├── collections/            # Payload collections
│   ├── components/             # React components
│   ├── fonts/                  # Custom fonts
│   │   ├── Inter-Bold.ttf
│   │   ├── sohne.ts
│   │   └── sohnebreit-halbfett.woff2
│   ├── lib/                    # Utility libraries
│   ├── payments/               # Payment integration
│   ├── plugins/                # Payload plugins
│   ├── providers/              # React context providers
│   ├── utilities/              # Helper functions
│   ├── payload-types.ts        # Generated TypeScript types
│   └── payload.config.ts       # Payload CMS configuration
├── public/                     # Static assets
├── components.json             # shadcn/ui configuration
├── next.config.ts              # Next.js configuration
├── tailwind.config.mjs         # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Project dependencies
```

---

## Key Features

### Ecommerce Functionality
- Product catalog with dynamic routing
- Shopping cart
- Checkout process
- Order management
- Payment integration (Stripe & Razorpay)
- User authentication & account management

### CMS Features
- Payload CMS integration
- Rich text editor (Lexical)
- Form builder plugin
- SEO plugin
- E-commerce plugin
- Media storage (Vercel Blob)

### UI/UX Features
- Dark/Light mode support
- Responsive design
- Accessible components (Radix UI)
- Smooth animations
- Custom typography
- Toast notifications (Sonner)

---

## Development Scripts

```bash
# Development
npm run dev              # Start development server

# Production
npm run build            # Build for production
npm run start            # Start production server

# Payload CMS
npm run payload          # Payload CLI commands
npm run generate:types   # Generate TypeScript types
npm run generate:importmap  # Generate import map

# Code Quality
npm run knip             # Find unused dependencies
```

---

## Environment Requirements

- **Node.js:** ^18.20.2 or >=20.9.0
- **Package Manager:** npm, yarn, or pnpm
- **Database:** PostgreSQL

---

## Configuration Files

1. **next.config.ts** - Next.js configuration
2. **tailwind.config.mjs** - Tailwind CSS configuration
3. **tsconfig.json** - TypeScript compiler options
4. **components.json** - shadcn/ui component configuration
5. **payload.config.ts** - Payload CMS configuration
6. **postcss.config.js** - PostCSS configuration

---

## Theme Configuration

### Dark Mode
- **Strategy:** Selector-based
- **Selector:** `[data-theme="dark"]`
- **Implementation:** next-themes package

### Container
- **Max Width:** 76.125rem (1218px)
- **Padding:** 2rem (32px)
- **Centered:** Yes

---

## Plugins & Extensions

### Payload CMS Plugins
- E-commerce Plugin
- Form Builder Plugin
- SEO Plugin
- Storage Plugin (Vercel Blob)
- Email Plugin (Nodemailer)
## Testing

- **E2E Testing:** Playwright 1.56.1

---

## Notes

- The project uses Next.js App Router (not Pages Router)
- Route groups are used for organization: `(app)` and `(payload)`
- Custom fonts are loaded via Next.js `localFont`
- The design system uses OKLCH color space for better color consistency
- All UI components are built with accessibility in mind using Radix UI primitives

---

**Last Updated:** November 24, 2025
