# AlgoFlow - Visual Algorand Smart Contract & Transaction Builder

A visual, node-based development environment for building and deploying Algorand smart contracts and transactions without writing code.

## Overview

AlgoFlow is a powerful visual programming platform that enables developers to create Algorand blockchain applications using an intuitive drag-and-drop interface. Build smart contracts, compose transactions, and deploy to the Algorand network - all through a visual flow builder.

## Key Features

- **Visual Flow Builder**: Drag-and-drop interface for building Algorand applications
- **Smart Contract Builder**: Create and deploy smart contracts visually
- **Transaction Composer**: Build complex transaction flows without code
- **Live Code Generation**: See JavaScript code generated in real-time
- **Wallet Integration**: Connect with Algorand wallets (Pera, Defly, Exodus, Lute)
- **Built-in Terminal**: Execute and test your flows directly in the browser
- **Dark/Light Mode**: Comfortable development environment

## Technology Stack

- **Frontend**: Next.js 14 with App Router
- **UI Components**: shadcn/ui with Tailwind CSS
- **Flow Editor**: React Flow
- **Blockchain**: Algorand SDK (algosdk)
- **Wallet Integration**: Algorand wallets
- **Code Generation**: Custom AST-based generator

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager
- An Algorand wallet (optional, for testing)

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/algoflow.git
   cd algoflow
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
├── app/
│   ├── build/
│   │   ├── contracts/    # Smart contract builder
│   │   └── transactions/ # Transaction builder
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── flow-builder.tsx  # Main flow editor
│   ├── node-sidebar.tsx  # Node palette
│   ├── wallet-panel.tsx  # Wallet interface
│   ├── terminalbuild.tsx # Execution terminal
│   └── ui/               # UI components
├── lib/
│   └── code-generator.ts # Code generation engine
└── public/               # Static assets
```

## Quick Start

1. **Create a Wallet**: Click the wallet button to generate a new Algorand wallet
2. **Build a Flow**: Drag nodes from the sidebar onto the canvas
3. **Connect Nodes**: Link nodes together to create your logic flow
4. **Deploy**: Click "Deploy Contract" or "Run Flow" to execute
5. **Export Code**: Download the generated JavaScript code

For detailed instructions, see [FULL_guide.md](./FULL_guide.md)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Documentation

- [Full Guide](./FULL_guide.md) - Complete documentation
- [Algorand Docs](https://developer.algorand.org/)

## Acknowledgments

- [Algorand](https://www.algorand.com/)
- [Next.js](https://nextjs.org/)
- [React Flow](https://reactflow.dev/)
- [shadcn/ui](https://ui.shadcn.com/)
