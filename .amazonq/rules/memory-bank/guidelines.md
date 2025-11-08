# Development Guidelines

## Code Quality Standards

### File Structure
- **"use client" directive**: All interactive components use "use client" at the top of the file (5/5 files)
- **Import organization**: Imports grouped by external libraries, then internal components, then utilities
- **Single responsibility**: Each component file focuses on one primary component with helper functions/components

### Naming Conventions
- **Components**: PascalCase for component names (TransactionBuilder, NodePropertiesPanel, WalletPanel)
- **Files**: kebab-case for file names (transaction-builder.tsx, node-properties-panel.tsx, wallet-panel.tsx)
- **Interfaces**: PascalCase with descriptive suffixes (TransactionBuilderProps, WalletPanelProps, SimulationResult)
- **Functions**: camelCase for function names (simulateTransaction, copyToClipboard, getMethodType)
- **Constants**: UPPER_SNAKE_CASE for constants (SIDEBAR_COOKIE_NAME, SIDEBAR_WIDTH, NETWORK_CONFIG)
- **State variables**: camelCase with descriptive names (isSimulating, simulationResult, selectedNode)

### TypeScript Usage
- **Strict typing**: All props interfaces explicitly defined
- **Type annotations**: Function parameters and return types specified where needed
- **Optional properties**: Use `?` for optional props (wallet?: any, tooltip?: string)
- **Type guards**: Use `instanceof` and typeof checks for runtime type safety
- **Generic types**: Leverage React generic types (React.ComponentProps<'div'>, React.ElementRef<typeof Button>)

## Component Architecture Patterns

### Component Composition (5/5 files)
```typescript
// Pattern: Compound components with sub-components
export function Sidebar() { }
export function SidebarHeader() { }
export function SidebarContent() { }
export function SidebarFooter() { }
```

### Props Interface Pattern (5/5 files)
```typescript
interface ComponentProps {
  // Required props first
  contract: any
  method: any
  // Optional props with ?
  wallet?: any
  onClose?: () => void
}
```

### forwardRef Pattern (4/5 files)
```typescript
const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} {...props} />
  }
)
Component.displayName = 'Component'
```

## State Management Patterns

### useState Hook (5/5 files)
```typescript
// Pattern: Descriptive state names with type inference
const [isLoading, setIsLoading] = useState(false)
const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null)
const [config, setConfig] = useState(selectedNode?.data?.config || {})
```

### useEffect Hook (3/5 files)
```typescript
// Pattern: Dependency arrays for reactive updates
useEffect(() => {
  if (wallet?.address) {
    fetchBalanceAndTransactions()
  }
}, [wallet?.address, network])
```

### useCallback Hook (2/5 files)
```typescript
// Pattern: Memoize callbacks to prevent re-renders
const toggleSidebar = React.useCallback(() => {
  return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
}, [isMobile, setOpen, setOpenMobile])
```

### useMemo Hook (2/5 files)
```typescript
// Pattern: Memoize expensive computations
const contextValue = React.useMemo<SidebarContext>(
  () => ({ state, open, setOpen, isMobile }),
  [state, open, setOpen, isMobile]
)
```

## Styling Patterns

### Tailwind CSS Classes (5/5 files)
```typescript
// Pattern: Utility-first with cn() helper for conditional classes
className={cn(
  'flex items-center gap-2',
  isActive && 'bg-accent',
  className
)}
```

### CSS Variables for Theming (2/5 files)
```typescript
// Pattern: CSS custom properties for dynamic values
style={{
  '--sidebar-width': SIDEBAR_WIDTH,
  '--color-bg': indicatorColor,
} as React.CSSProperties}
```

### Responsive Design (4/5 files)
```typescript
// Pattern: Mobile-first with md: breakpoint modifiers
className="hidden md:block"
className="grid grid-cols-2 md:grid-cols-4"
```

## Common UI Patterns

### Loading States (4/5 files)
```typescript
// Pattern: Boolean flag with conditional rendering
{isLoading ? (
  <Loader2 className="h-4 w-4 animate-spin" />
) : (
  <Eye className="h-4 w-4" />
)}
```

### Error Handling (3/5 files)
```typescript
// Pattern: Try-catch with error state
try {
  await operation()
} catch (error) {
  setError(error instanceof Error ? error.message : "Operation failed")
}
```

### Conditional Rendering (5/5 files)
```typescript
// Pattern: Ternary for simple conditions, && for existence checks
{simulationResult ? <ResultCard /> : <EmptyState />}
{error && <ErrorMessage>{error}</ErrorMessage>}
```

### Copy to Clipboard (3/5 files)
```typescript
// Pattern: Navigator clipboard API with button
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
}
```

## Form Handling Patterns

### Controlled Inputs (5/5 files)
```typescript
// Pattern: Value from state, onChange updates state
<Input
  value={config.address || ""}
  onChange={(e) => setConfig({ ...config, address: e.target.value })}
  placeholder="Enter address"
/>
```

### Spread Operator for State Updates (5/5 files)
```typescript
// Pattern: Immutable state updates with spread
setConfig({ ...config, amount: Number(e.target.value) })
const newArgs = [...args]
newArgs[index] = value
```

### Select Components (3/5 files)
```typescript
// Pattern: shadcn/ui Select with controlled value
<Select value={config.method} onValueChange={(value) => setConfig({ ...config, method: value })}>
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="call">Call</SelectItem>
  </SelectContent>
</Select>
```

## API Integration Patterns

### Async/Await (2/5 files)
```typescript
// Pattern: Async functions with loading states
const fetchData = async () => {
  setIsLoading(true)
  try {
    const response = await fetch(url)
    const data = await response.json()
    setData(data)
  } catch (error) {
    setError(error.message)
  } finally {
    setIsLoading(false)
  }
}
```

### Network Configuration (1/5 files)
```typescript
// Pattern: Environment-based configuration objects
const NETWORK_CONFIG = {
  testnet: { indexer: "...", algod: "...", explorer: "..." },
  mainnet: { indexer: "...", algod: "...", explorer: "..." }
}
```

## Component Library Usage

### shadcn/ui Components (5/5 files)
- Import from `@/components/ui/*`
- Use Button, Card, Input, Label, Select, Tabs, Badge, Alert consistently
- Leverage variant props for styling variations

### Lucide Icons (5/5 files)
```typescript
// Pattern: Import specific icons, use with consistent sizing
import { Eye, Send, AlertTriangle, CheckCircle } from "lucide-react"
<Eye className="h-4 w-4" />
```

### Radix UI Primitives (2/5 files)
- Use Slot for polymorphic components
- Leverage Radix accessibility features
- Extend with custom styling via className

## Data Transformation Patterns

### Type Parsing (2/5 files)
```typescript
// Pattern: Recursive parsing for complex types
function parseTupleType(type: string): string[] {
  // Parse nested structures with depth tracking
  let depth = 0
  // Split by comma at depth 0
}
```

### Array Mapping (4/5 files)
```typescript
// Pattern: Map with index for keys
{items.map((item, index) => (
  <Component key={item.id || index} data={item} />
))}
```

### Conditional Data Display (4/5 files)
```typescript
// Pattern: Optional chaining with fallbacks
const value = data?.property || "Default"
const formatted = wallet?.address ? `${wallet.address.substring(0, 10)}...` : "No wallet"
```

## Performance Optimization

### Memoization (2/5 files)
- Use React.useMemo for expensive computations
- Use React.useCallback for event handlers passed to children
- Memoize context values to prevent unnecessary re-renders

### Lazy Evaluation (3/5 files)
```typescript
// Pattern: Compute values only when needed
const width = React.useMemo(() => {
  return `${Math.floor(Math.random() * 40) + 50}%`
}, [])
```

## Accessibility Patterns

### ARIA Labels (2/5 files)
```typescript
// Pattern: Screen reader text and aria labels
<span className="sr-only">Toggle Sidebar</span>
<button aria-label="Toggle Sidebar" />
```

### Keyboard Shortcuts (1/5 files)
```typescript
// Pattern: Global keyboard event listeners
React.useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'b' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault()
      toggleSidebar()
    }
  }
  window.addEventListener('keydown', handleKeyDown)
  return () => window.removeEventListener('keydown', handleKeyDown)
}, [toggleSidebar])
```

## Code Organization Best Practices

### Helper Functions (5/5 files)
- Define helper functions within component file when specific to that component
- Extract to separate utility files when reusable across components
- Place helper functions before main component or after for readability

### Constants (3/5 files)
- Define constants at module level before components
- Use UPPER_SNAKE_CASE for true constants
- Group related constants together

### Type Definitions (5/5 files)
- Define interfaces before component that uses them
- Export types when needed by other components
- Use descriptive names with Props/Result/Config suffixes

## Testing & Debugging Patterns

### Console Logging (2/5 files)
```typescript
// Pattern: Descriptive error logging
console.error("Error fetching wallet data:", error)
```

### Mock Data (1/5 files)
```typescript
// Pattern: Mock responses for development/testing
const mockResult: SimulationResult = {
  success: Math.random() > 0.3,
  logs: ["Application call to app " + contract.appId],
  gasUsed: 1000
}
```

## File Download Pattern (1/5 files)
```typescript
// Pattern: Client-side file generation and download
const json = JSON.stringify(data, null, 2)
const blob = new Blob([json], { type: "application/json" })
const url = URL.createObjectURL(blob)
const a = document.createElement("a")
a.href = url
a.download = `filename.json`
document.body.appendChild(a)
a.click()
document.body.removeChild(a)
URL.revokeObjectURL(url)
```
