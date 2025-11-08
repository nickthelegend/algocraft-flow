"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { FlowBuilder } from "@/components/flow-builder"
import { TerminalBuild } from "@/components/terminalbuild"
import { toast } from "@/hooks/use-toast"
import { Play, Download, Trash2, TerminalIcon } from "lucide-react"
import { WalletPanel } from "@/components/wallet-panel"
import { WalletButton } from "@/components/wallet-button"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
import algosdk from "algosdk"
import { generateCode } from "@/lib/code-generator"

interface Wallet {
  address: string
  balance: number
  privateKey: string
  mnemonic: string
  transactions: any[]
  algoPrice: number
}

export default function ContractsPage() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [terminalOutput, setTerminalOutput] = useState("")
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const [selectedNode, setSelectedNode] = useState(null)
  const [showWallet, setShowWallet] = useState(false)
  const [wallet, setWallet] = useState<Wallet | null>(null)

  useEffect(() => {
    const savedWallet = localStorage.getItem("algorand-wallet")
    if (savedWallet) {
      try {
        const parsedWallet = JSON.parse(savedWallet)
        if (parsedWallet && typeof parsedWallet.address === 'string') {
          setWallet(parsedWallet)
          setShowWallet(true)
        }
      } catch (error) {
        console.error("Error parsing wallet:", error)
      }
    }
  }, [])

  const handleRun = async () => {
    setTerminalOutput("")
    setIsTerminalOpen(true)

    let logs = "[INFO] Starting smart contract deployment...\n"
    setTerminalOutput(logs)

    toast({
      title: "Running Contract",
      description: "Your smart contract is being executed...",
      duration: 3000,
    })

    const generatedCode = generateCode(nodes, edges)
    let modifiedGeneratedCode = generatedCode
      .replace("import algosdk from 'algosdk';", "")
      .replace("const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);", "")
      .replace("const params = await algodClient.getTransactionParams().do();", "")

    const originalConsoleLog = console.log
    const originalConsoleError = console.error
    const originalConsoleWarn = console.warn
    
    console.log = (...args) => {
      const msg = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(" ")
      logs += `[LOG] ${msg}\n`
      setTerminalOutput(logs)
      originalConsoleLog.apply(console, args)
    }
    
    console.error = (...args) => {
      const msg = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(" ")
      logs += `[ERROR] ${msg}\n`
      setTerminalOutput(logs)
      originalConsoleError.apply(console, args)
    }
    
    console.warn = (...args) => {
      const msg = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(" ")
      logs += `[WARN] ${msg}\n`
      setTerminalOutput(logs)
      originalConsoleWarn.apply(console, args)
    }

    try {
      logs += "[INFO] Connecting to Algorand TestNet...\n"
      setTerminalOutput(logs)

      const algodToken = 'YOUR_ALGOD_API_TOKEN'
      const algodServer = 'https://testnet-api.algonode.cloud'
      const algodPort = ''

      const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort)
      
      logs += "[INFO] Fetching transaction parameters...\n"
      setTerminalOutput(logs)
      
      const params = await algodClient.getTransactionParams().do()
      
      logs += `[INFO] Current round: ${params.firstRound}\n`
      logs += `[INFO] Fee: ${params.fee} microAlgos\n`
      logs += `[INFO] Genesis ID: ${params.genesisID}\n`
      logs += "[INFO] Executing contract deployment...\n"
      logs += "-----------------------------------\n"
      setTerminalOutput(logs)

      const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor
      const runnableCode = new AsyncFunction('algosdk', 'algodClient', 'params', modifiedGeneratedCode)
      
      const result = await runnableCode(algosdk, algodClient, params)
      
      if (result !== undefined) {
        logs += `[RESULT] ${typeof result === 'object' ? JSON.stringify(result, null, 2) : result}\n`
      }

      logs += "-----------------------------------\n"
      logs += "[SUCCESS] Contract deployment completed successfully!\n"
      setTerminalOutput(logs)
      
      toast({
        title: "Contract Execution Complete",
        description: "Check terminal for output.",
        duration: 3000,
      })
    } catch (error: any) {
      logs += "-----------------------------------\n"
      logs += `[ERROR] Execution failed: ${error.message}\n`
      if (error.response) {
        logs += `[ERROR] Response: ${JSON.stringify(error.response, null, 2)}\n`
      }
      if (error.stack) {
        logs += `[ERROR] Stack trace:\n${error.stack}\n`
      }
      logs += "-----------------------------------\n"
      setTerminalOutput(logs)
      
      toast({
        title: "Contract Execution Failed",
        description: error.message,
        duration: 5000,
        variant: "destructive",
      })
    } finally {
      console.log = originalConsoleLog
      console.error = originalConsoleError
      console.warn = originalConsoleWarn
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden" style={{ backgroundColor: "var(--background-color)", color: "var(--text-color)" }}>
      <div className="h-9 flex items-center justify-between px-4 text-sm border-b flex-shrink-0" style={{ backgroundColor: "var(--sidebar-color)", borderColor: "var(--border-color)" }}>
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#28ca42]"></div>
          </div>
          <span className="font-medium" style={{ color: "var(--text-color)" }}>AlgoFlow - Smart Contracts</span>
        </div>
        <div className="flex items-center gap-2">
          <WalletButton 
            onWalletChange={setWallet}
            onTogglePanel={() => setShowWallet(!showWallet)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="px-4 py-2 border-b flex items-center justify-center gap-8" style={{ backgroundColor: "var(--sidebar-color)", borderColor: "var(--border-color)" }}>
          <div className="flex items-center gap-2">
            <Button onClick={handleRun} className="font-semibold px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded" size="sm">
              <Play className="h-4 w-4 mr-2" />
              Deploy Contract
            </Button>
            <Button
              onClick={() => {
                const generatedCode = generateCode(nodes, edges)
                const dataBlob = new Blob([generatedCode], { type: "text/javascript" })
                const url = URL.createObjectURL(dataBlob)
                const link = document.createElement("a")
                link.href = url
                link.download = `algorand-contract-${Date.now()}.js`
                link.click()
                URL.revokeObjectURL(url)
                toast({
                  title: "Contract Exported",
                  description: "Your smart contract has been exported as a .js file",
                  duration: 3000,
                })
              }}
              size="sm"
              style={{ backgroundColor: "var(--button-color)", color: "var(--text-color)" }}
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => {
                if (selectedNode) {
                  setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id))
                  setEdges((eds) =>
                    eds.filter((edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id),
                  )
                  setSelectedNode(null)
                  toast({
                    title: "Node Deleted",
                    description: "Selected node has been removed",
                    duration: 2000,
                  })
                } else {
                  toast({
                    title: "No Node Selected",
                    description: "Please select a node to delete",
                    duration: 2000,
                  })
                }
              }}
              size="sm"
              style={{ backgroundColor: "var(--button-color)", color: "var(--text-color)" }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <PanelGroup direction="horizontal" className="flex-1">
          <Panel defaultSize={showWallet && wallet ? 75 : 100} minSize={30}>
            <FlowBuilder
              type="contract"
              key="contract"
              onFlowChange={(newNodes, newEdges) => {
                setNodes(newNodes)
                setEdges(newEdges)
              }}
              onNodeSelect={setSelectedNode}
            />
          </Panel>
          {showWallet && wallet && (
            <>
              <PanelResizeHandle className="w-1 bg-[var(--border-color)] hover:bg-blue-500 transition-colors" />
              <Panel defaultSize={25} minSize={15} maxSize={50}>
                <WalletPanel wallet={wallet} onClose={() => setShowWallet(false)} />
              </Panel>
            </>
          )}
        </PanelGroup>
      </div>



      <TerminalBuild isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} output={terminalOutput} />
    </div>
  )
}
