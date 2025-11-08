# Project Structure

## Directory Organization

### `/app` - Next.js App Router
Application pages and routing using Next.js 14 App Router architecture.

- **`/contract`**: Smart contract builder page with flow interface
- **`/transaction`**: Transaction management and execution page
- **`/docs`**: Documentation and help pages
- **`layout.tsx`**: Root layout with providers, navigation, and theme setup
- **`page.tsx`**: Landing page with hero sections and feature showcase
- **`globals.css`**: Global styles and Tailwind CSS imports

### `/components` - React Components
Reusable UI components and application-specific components.

#### Core Application Components
- **`flow-builder.tsx`**: Main visual flow builder with ReactFlow integration
- **`node-sidebar.tsx`**: Sidebar for dragging nodes onto canvas
- **`node-properties-panel.tsx`**: Panel for configuring selected node properties
- **`transaction-builder.tsx`**: Interface for building and executing transactions
- **`wallet-panel.tsx`**: Wallet connection and account management
- **`terminal.tsx`**: Output terminal for execution logs
- **`nav.tsx`**: Main navigation bar
- **`footer.tsx`**: Site footer
- **`providers.tsx`**: Wallet and context providers setup
- **`theme-provider.tsx`**: Dark/light theme management
- **`theme-toggle.tsx`**: Theme switcher component

#### Node Components (`/nodes`)
- **`algorand-nodes.tsx`**: All Algorand transaction node types (Account, Payment, AssetTransfer, ApplicationCall, AssetCreate, KeyReg, Condition, Output, SignTxn, ExecuteTxn, AssetFreeze)

#### UI Components (`/ui`)
shadcn/ui component library with 50+ pre-built components including:
- Form controls (Button, Input, Select, Checkbox, etc.)
- Layout components (Card, Tabs, Dialog, Sheet, etc.)
- Feedback components (Alert, Toast, Progress, etc.)
- Navigation components (Sidebar, Breadcrumb, Menu, etc.)

#### Dashboard Components (`/dashboard`)
- **`sidebar.tsx`**: Dashboard navigation sidebar

### `/hooks` - Custom React Hooks
- **`use-mobile.tsx`**: Mobile device detection hook
- **`use-toast.ts`**: Toast notification management hook

### `/lib` - Utility Libraries
- **`utils.ts`**: Common utility functions (cn for className merging)
- **`code-generator.ts`**: Generates code from visual flows
- **`reclaim.ts`**: Reclaim Protocol integration utilities

### `/public` - Static Assets
- Placeholder images and logos
- SVG assets

### `/styles` - Additional Styles
- **`globals.css`**: Extended global styles

## Core Architecture Patterns

### Component Architecture
- **Client Components**: All interactive components use "use client" directive
- **Server Components**: Minimal usage, primarily for static content
- **Composition Pattern**: Small, focused components composed into larger features

### State Management
- **React Hooks**: useState, useCallback, useEffect for local state
- **ReactFlow State**: useNodesState, useEdgesState for flow management
- **Context Providers**: Wallet state, theme state via React Context

### Data Flow
1. **Node Creation**: User drags node from sidebar → drops on canvas → node added to state
2. **Node Configuration**: User clicks node → properties panel opens → updates node data
3. **Transaction Building**: Flow converted to transaction → arguments configured → simulation/execution
4. **Wallet Integration**: Wallet provider → wallet state → transaction signing

### Routing Structure
- `/` - Landing page with marketing content
- `/contract` - Main flow builder interface
- `/transaction` - Transaction execution interface
- `/docs` - Documentation pages

## Key Relationships

### Flow Builder Ecosystem
```
FlowBuilder (main canvas)
├── NodeSidebar (node palette)
├── ReactFlow (canvas engine)
│   ├── Node Components (visual nodes)
│   ├── Controls (zoom, pan)
│   ├── MiniMap (overview)
│   └── Background (grid)
└── NodePropertiesPanel (configuration)
```

### Transaction Execution Flow
```
TransactionBuilder
├── Contract Information Display
├── Method Arguments Input
├── Simulation Tab
│   └── SimulationResult Display
├── Advanced Options Tab
└── Execution Buttons
    ├── Simulate Transaction
    └── Execute Transaction
```

### Wallet Integration
```
Providers (root)
├── ThemeProvider
└── WalletProvider (@txnlab/use-wallet-react)
    ├── Pera Wallet
    ├── Defly Wallet
    ├── Exodus Wallet
    └── Lute Wallet
```

## Configuration Files
- **`package.json`**: Dependencies and scripts
- **`tsconfig.json`**: TypeScript configuration (ES6 target, strict mode)
- **`next.config.mjs`**: Next.js configuration (TypeScript errors ignored, unoptimized images)
- **`tailwind.config.ts`**: Tailwind CSS theming and customization
- **`components.json`**: shadcn/ui component configuration
- **`postcss.config.mjs`**: PostCSS configuration for Tailwind
