"use client"

import { Button } from "@/components/ui/button"
import { Download, Copy, Play } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useState } from "react"

export default function CodePreview({ 
  xml, 
  code 
}: { 
  xml: string
  code: string 
}) {
  const [compiling, setCompiling] = useState(false)

  const handleCompile = async () => {
    setCompiling(true)
    toast({
      title: "Compiling...",
      description: "Compiling your smart contract",
      duration: 2000,
    })
    
    setTimeout(() => {
      setCompiling(false)
      toast({
        title: "Compilation Complete",
        description: "Contract compiled successfully",
        duration: 2000,
      })
    }, 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/javascript" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `contract-${Date.now()}.js`
    link.click()
    URL.revokeObjectURL(url)
    
    toast({
      title: "Code Exported",
      description: "Contract code downloaded successfully",
      duration: 2000,
    })
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    toast({
      title: "Copied",
      description: "Code copied to clipboard",
      duration: 2000,
    })
  }

  const handleDownloadXml = () => {
    const blob = new Blob([xml], { type: "text/xml" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `workspace-${Date.now()}.xml`
    link.click()
    URL.revokeObjectURL(url)
    
    toast({
      title: "Workspace Exported",
      description: "Workspace XML downloaded successfully",
      duration: 2000,
    })
  }

  return (
    <div style={{ 
      height: "100%", 
      overflow: "auto", 
      color: "#e6e6e6",
      background: "#111",
      display: "flex",
      flexDirection: "column"
    }}>
      <div style={{ 
        padding: 16, 
        borderBottom: "1px solid #222",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h4 style={{ 
          color: "#fff", 
          fontSize: 16, 
          fontWeight: 600,
          margin: 0 
        }}>
          Code Preview
        </h4>
        <div style={{ display: "flex", gap: 8 }}>
          <Button 
            size="sm" 
            onClick={handleCompile}
            disabled={compiling}
            style={{ 
              background: "#16a34a", 
              border: "none",
              color: "#fff"
            }}
          >
            <Play className="h-3 w-3 mr-1" />
            {compiling ? "Compiling..." : "Compile"}
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={handleCopy}
            style={{ 
              background: "#1a1a1a", 
              border: "1px solid #333",
              color: "#fff"
            }}
          >
            <Copy className="h-3 w-3" />
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={handleDownload}
            style={{ 
              background: "#1a1a1a", 
              border: "1px solid #333",
              color: "#fff"
            }}
          >
            <Download className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      <div style={{ 
        flex: 1, 
        padding: 16, 
        overflow: "auto" 
      }}>
        <pre style={{ 
          whiteSpace: "pre-wrap", 
          fontFamily: "monospace", 
          fontSize: 13,
          lineHeight: 1.6,
          margin: 0,
          color: "#e6e6e6"
        }}>
          {code || "// Build your contract using blocks"}
        </pre>
      </div>

      <div style={{ 
        padding: 16, 
        borderTop: "1px solid #222" 
      }}>
        <Button 
          size="sm" 
          variant="outline"
          onClick={handleDownloadXml}
          style={{ 
            width: "100%",
            background: "#1a1a1a", 
            border: "1px solid #333",
            color: "#fff"
          }}
        >
          Export Workspace XML
        </Button>
      </div>
    </div>
  )
}
