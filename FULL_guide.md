# AlgoFlow - Complete Guide

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Interface Overview](#interface-overview)
4. [Building Smart Contracts](#building-smart-contracts)
5. [Creating Transactions](#creating-transactions)
6. [Wallet Management](#wallet-management)
7. [Node Reference](#node-reference)
8. [Code Generation](#code-generation)
9. [Deployment](#deployment)
10. [Best Practices](#best-practices)

---

## Introduction

AlgoFlow is a visual development platform for Algorand blockchain applications. It allows you to build smart contracts and transaction flows using a node-based interface, eliminating the need to write code manually.

### What You Can Build

- Smart contracts with custom logic
- Payment transactions
- Asset creation and transfers
- Application calls
- Complex multi-step transaction flows

---

## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/algoflow.git
cd algoflow

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### First Steps

1. **Navigate to a Builder**: Choose either `/build/contracts` or `/build/transactions`
2. **Create a Wallet**: Click the wallet button in the top-right to generate a test wallet
3. **Add Nodes**: Drag nodes from the left sidebar onto the canvas
4. **Connect Nodes**: Click and drag from one node's output to another's input
5. **Configure**: Click nodes to edit their properties in the right panel
6. **Execute**: Click "Deploy Contract" or "Run Flow" to execute your creation

---

## Interface Overview

### Main Components

#### 1. Top Bar
- **Window Controls**: macOS-style window buttons
- **Title**: Current page (Smart Contracts / Transactions)
- **Wallet Button**: Create/manage wallets and toggle wallet panel

#### 2. Toolbar
- **Deploy/Run Button**: Execute your flow
- **Download Button**: Export generated code
- **Delete Button**: Remove selected node

#### 3. Node Sidebar (Left)
Categorized nodes you can drag onto the canvas:
- **Transactions**: Payment, asset transfer, app call
- **Smart Contracts**: Contract creation, state management
- **Logic**: Conditions, loops, variables
- **Utilities**: Logging, delays, formatters

#### 4. Canvas (Center)
The main workspace where you build your flows:
- **Drag nodes** from sidebar
- **Connect nodes** by dragging from output to input ports
- **Pan** by clicking and dragging empty space
- **Zoom** with mouse wheel or trackpad

#### 5. Properties Panel (Right)
Appears when you select a node:
- Edit node parameters
- Configure inputs/outputs
- View node documentation

#### 6. Wallet Panel (Right, toggleable)
- View wallet address and balance
- See transaction history
- Copy wallet details
- Monitor ALGO price

#### 7. Terminal (Bottom)
Shows execution logs:
- Connection status
- Transaction details
- Errors and warnings
- Execution results

---

## Building Smart Contracts

### Contract Builder (`/build/contracts`)

#### Step 1: Add Contract Node

Drag a "Create Application" node onto the canvas. This is the foundation of your smart contract.

**Configuration:**
- **Approval Program**: The main contract logic
- **Clear Program**: Cleanup logic when users opt out
- **Global State**: Contract-wide storage
- **Local State**: Per-user storage

#### Step 2: Add Logic Nodes

Build your contract logic using:
- **Condition nodes**: If/else logic
- **State nodes**: Read/write to storage
- **Transaction nodes**: Handle payments, transfers

#### Step 3: Connect Flow

Link nodes in execution order. The flow determines how your contract processes transactions.

#### Example: Simple Counter Contract

```
[Start] → [Create Application] → [Increment Counter] → [Store State] → [End]
```

1. Drag "Create Application" node
2. Set global state schema: `counter: uint64`
3. Add "Increment" logic node
4. Connect to "Store State" node
5. Deploy to TestNet

---

## Creating Transactions

### Transaction Builder (`/build/transactions`)

#### Payment Transaction

1. Drag "Payment Transaction" node
2. Configure:
   - **Receiver**: Destination address
   - **Amount**: ALGO amount (in microAlgos)
   - **Note**: Optional transaction note
3. Connect to execution flow
4. Run

#### Asset Transfer

1. Drag "Asset Transfer" node
2. Set:
   - **Asset ID**: The asset to transfer
   - **Receiver**: Destination address
   - **Amount**: Number of units
3. Execute

#### Application Call

1. Drag "App Call" node
2. Configure:
   - **App ID**: Target application
   - **Method**: Function to call
   - **Arguments**: Method parameters
3. Run transaction

---

## Wallet Management

### Creating a Wallet

1. Click the wallet button (top-right)
2. Select "Create New Wallet"
3. Your wallet is generated with:
   - Address
   - Private key (stored locally)
   - Mnemonic phrase

**⚠️ Important**: This is a development wallet. Never use it for real funds.

### Wallet Panel Features

- **Address**: Click to copy
- **Balance**: Real-time ALGO balance
- **Transactions**: View transaction history
- **Price**: Current ALGO/USD rate

### Toggle Wallet Panel

Click the wallet button to show/hide the panel. The panel starts hidden by default.

---

## Node Reference

### Transaction Nodes

#### Payment Transaction
Sends ALGO from one account to another.

**Inputs:**
- `receiver` (string): Destination address
- `amount` (number): Amount in microAlgos
- `note` (string, optional): Transaction note

**Outputs:**
- `txnId` (string): Transaction ID

#### Asset Transfer
Transfers Algorand Standard Assets (ASAs).

**Inputs:**
- `assetId` (number): Asset ID
- `receiver` (string): Destination address
- `amount` (number): Asset units

**Outputs:**
- `txnId` (string): Transaction ID

#### Application Call
Calls a smart contract method.

**Inputs:**
- `appId` (number): Application ID
- `method` (string): Method name
- `args` (array): Method arguments

**Outputs:**
- `result` (any): Method return value

### Smart Contract Nodes

#### Create Application
Deploys a new smart contract.

**Inputs:**
- `approvalProgram` (string): TEAL code
- `clearProgram` (string): Clear TEAL code
- `globalSchema` (object): Global state schema
- `localSchema` (object): Local state schema

**Outputs:**
- `appId` (number): Created application ID

#### Update Application
Updates existing contract code.

**Inputs:**
- `appId` (number): Application to update
- `approvalProgram` (string): New TEAL code

**Outputs:**
- `success` (boolean): Update status

#### Delete Application
Removes a smart contract.

**Inputs:**
- `appId` (number): Application to delete

**Outputs:**
- `success` (boolean): Deletion status

### Logic Nodes

#### Condition
Branches execution based on a condition.

**Inputs:**
- `condition` (boolean): Condition to evaluate
- `trueFlow` (connection): Execute if true
- `falseFlow` (connection): Execute if false

#### Variable
Stores and retrieves values.

**Inputs:**
- `name` (string): Variable name
- `value` (any): Value to store

**Outputs:**
- `value` (any): Stored value

---

## Code Generation

AlgoFlow automatically generates JavaScript code from your visual flows.

### How It Works

1. **Parse Flow**: Analyzes nodes and connections
2. **Build AST**: Creates abstract syntax tree
3. **Generate Code**: Converts to JavaScript
4. **Optimize**: Removes redundant code

### Generated Code Structure

```javascript
import algosdk from 'algosdk';

// Initialize Algorand client
const algodClient = new algosdk.Algodv2(token, server, port);

// Get transaction parameters
const params = await algodClient.getTransactionParams().do();

// Your flow logic
// ... generated code ...

// Sign and send transaction
const signedTxn = txn.signTxn(privateKey);
await algodClient.sendRawTransaction(signedTxn).do();
```

### Exporting Code

Click the download button to export your generated code as a `.js` file. You can run it independently with Node.js.

---

## Deployment

### TestNet Deployment

1. **Build Your Flow**: Create your contract or transaction flow
2. **Connect Wallet**: Ensure you have a wallet connected
3. **Fund Wallet**: Get TestNet ALGO from [dispenser](https://bank.testnet.algorand.network/)
4. **Deploy**: Click "Deploy Contract" or "Run Flow"
5. **Monitor**: Watch the terminal for deployment status

### Execution Flow

```
[Build Flow] → [Generate Code] → [Connect to TestNet] 
→ [Sign Transaction] → [Submit] → [Confirm] → [Success]
```

### Troubleshooting

**Error: Insufficient Balance**
- Fund your wallet with TestNet ALGO

**Error: Invalid Transaction**
- Check node configurations
- Verify all required fields are filled

**Error: Network Timeout**
- Check internet connection
- Try again in a few moments

---

## Best Practices

### Smart Contract Development

1. **Start Simple**: Begin with basic contracts, add complexity gradually
2. **Test Thoroughly**: Use TestNet before MainNet
3. **Handle Errors**: Add error handling nodes
4. **Optimize State**: Minimize global/local state usage
5. **Document**: Add notes to complex flows

### Transaction Flows

1. **Validate Inputs**: Check addresses and amounts
2. **Use Notes**: Add transaction notes for tracking
3. **Batch Operations**: Group related transactions
4. **Monitor Gas**: Be aware of transaction fees
5. **Confirm Success**: Always check transaction status

### Security

1. **Never Share Private Keys**: Keep mnemonics secure
2. **Test Wallets Only**: Don't use real funds in development
3. **Validate Addresses**: Double-check recipient addresses
4. **Review Generated Code**: Inspect before deployment
5. **Use TestNet First**: Always test on TestNet

### Performance

1. **Minimize Nodes**: Use fewer nodes when possible
2. **Optimize Connections**: Avoid unnecessary links
3. **Cache Results**: Store frequently used values
4. **Batch Transactions**: Group when applicable
5. **Monitor Execution**: Watch terminal for bottlenecks

---

## Advanced Topics

### Custom Nodes

You can extend AlgoFlow with custom nodes by editing `components/nodes/algorand-nodes.tsx`.

### Integration

Export generated code and integrate into your applications:

```javascript
import { executeFlow } from './generated-flow.js';

// Use in your app
await executeFlow(params);
```

### API Usage

AlgoFlow uses the Algorand JavaScript SDK. Reference the [official docs](https://developer.algorand.org/docs/sdks/javascript/) for advanced usage.

---

## Support & Resources

- **Algorand Developer Portal**: https://developer.algorand.org/
- **AlgoFlow Issues**: GitHub Issues
- **Community**: Algorand Discord

---

## License

MIT License - See LICENSE file for details.
