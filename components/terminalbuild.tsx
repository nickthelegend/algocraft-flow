"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface TerminalBuildProps {
  isOpen: boolean
  onClose: () => void
  output: string
}

export function TerminalBuild({ isOpen, onClose, output }: TerminalBuildProps) {
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      // Focus the terminal when it opens
      terminalRef.current?.focus()
    }
  }, [isOpen])

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 h-1/2 bg-[#1e1e1e] border-t border-gray-700 transform transition-transform duration-300 ease-in-out z-50",
        isOpen ? "translate-y-0" : "translate-y-full",
      )}
      ref={terminalRef}
      tabIndex={-1}
    >
      <div className="flex items-center justify-between p-2 bg-[#2d2d30] border-b border-gray-700">
        <span className="text-sm font-medium text-white">Terminal Output</span>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-gray-700 text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="p-4 text-sm text-green-400 font-mono overflow-y-auto h-[calc(100%-40px)] bg-[#1e1e1e]">
        <pre className="whitespace-pre-wrap break-all">{output || "No output yet. Run your flow to see results here."}</pre>
      </div>
    </div>
  )
}
