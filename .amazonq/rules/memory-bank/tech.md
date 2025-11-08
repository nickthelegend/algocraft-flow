# Technology Stack

## Core Technologies

### Frontend Framework
- **Next.js 14.2.25**: React framework with App Router
- **React 19**: UI library with latest features
- **TypeScript 5**: Type-safe JavaScript with ES6 target

### UI & Styling
- **Tailwind CSS 3.4.17**: Utility-first CSS framework
- **shadcn/ui**: Component library built on Radix UI primitives
- **Radix UI**: Unstyled, accessible component primitives
- **Framer Motion**: Animation library for smooth transitions
- **Lucide React 0.454.0**: Icon library
- **Geist 1.3.1**: Font family

### Flow & Visualization
- **@xyflow/react 12.9.2**: Node-based flow builder library (ReactFlow)
- **Recharts 2.15.0**: Chart and data visualization library

### Blockchain Integration
- **algosdk (latest)**: Algorand JavaScript SDK
- **@txnlab/use-wallet-react (latest)**: Algorand wallet integration
- **@perawallet/connect (latest)**: Pera Wallet connector
- **@blockshake/defly-connect (latest)**: Defly Wallet connector
- **lute-connect (latest)**: Lute Wallet connector
- **@walletconnect/modal (latest)**: WalletConnect modal
- **@walletconnect/sign-client (latest)**: WalletConnect signing

### Form & Validation
- **react-hook-form 7.54.1**: Form state management
- **@hookform/resolvers 3.9.1**: Form validation resolvers
- **zod 3.24.1**: Schema validation library

### Additional Libraries
- **next-themes (latest)**: Theme management (dark/light mode)
- **class-variance-authority 0.7.1**: CVA for component variants
- **clsx 2.1.1**: Conditional className utility
- **tailwind-merge 2.5.5**: Merge Tailwind classes intelligently
- **cmdk 1.0.4**: Command menu component
- **sonner 1.7.1**: Toast notifications
- **react-toastify (latest)**: Alternative toast library
- **swr (latest)**: Data fetching and caching
- **uuid (latest)**: UUID generation
- **date-fns 4.1.0**: Date manipulation
- **react-day-picker 9.8.0**: Date picker component
- **input-otp 1.4.1**: OTP input component
- **react-qr-code (latest)**: QR code generation
- **embla-carousel-react 8.5.1**: Carousel component
- **vaul 0.9.6**: Drawer component
- **react-resizable-panels 2.1.7**: Resizable panel layouts

### Verification & Identity
- **@reclaimprotocol/js-sdk (latest)**: Reclaim Protocol integration
- **@magic-ext/algorand (latest)**: Magic wallet for Algorand
- **magic-sdk (latest)**: Magic authentication SDK

### Analytics
- **@vercel/analytics 1.3.1**: Vercel analytics integration

## Development Tools

### Build Tools
- **PostCSS 8.5**: CSS processing
- **Autoprefixer 10.4.20**: CSS vendor prefixing
- **Tailwind CSS Animate 1.0.7**: Animation utilities for Tailwind

### TypeScript Configuration
```json
{
  "target": "ES6",
  "strict": true,
  "module": "esnext",
  "moduleResolution": "bundler",
  "jsx": "preserve"
}
```

### Type Definitions
- **@types/node**: Node.js type definitions
- **@types/react 18**: React type definitions
- **@types/react-dom 18**: React DOM type definitions

## Build & Development Commands

### Available Scripts
```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Build production bundle
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Package Managers Supported
- npm (package-lock.json present)
- pnpm (pnpm-lock.yaml present)
- yarn (compatible)

## Configuration Details

### Next.js Configuration
- TypeScript build errors ignored for faster development
- Image optimization disabled (unoptimized: true)
- App Router enabled by default

### Path Aliases
- `@/*` maps to project root for clean imports

### Styling Configuration
- Tailwind CSS with custom theme
- CSS variables for theming
- Dark mode support via class strategy
- Custom color palette and design tokens

## Browser & Runtime Support
- Modern browsers with ES6+ support
- Node.js 18+ required for development
- Client-side rendering for interactive components
- Server-side rendering for static content

## Key Dependencies Versions
- React ecosystem: React 19, Next.js 14
- UI framework: Tailwind CSS 3.4, Radix UI latest
- Blockchain: Algorand SDK latest, wallet connectors latest
- Flow builder: @xyflow/react 12.9.2
- TypeScript: Version 5 with strict mode
