"use client"

import React, { useEffect, useState } from "react"

export default function BlockPicker({ 
  onToolboxXml 
}: { 
  onToolboxXml: (xml: string) => void 
}) {
  const [toolboxXml, setToolboxXml] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const Blockly = await import("blockly")
        const response = await fetch("/examples/blocks.json")
        const blockDefs = await response.json()
        Blockly.defineBlocksWithJsonArray(blockDefs)
        
        const { javascriptGenerator, Order } = await import("blockly/javascript")
        
        javascriptGenerator.forBlock["contract_class"] = function(block: any) {
          const name = block.getFieldValue("NAME")
          const body = javascriptGenerator.statementToCode(block, "BODY")
          return `import { Contract, GlobalState, LocalState, abimethod, uint64, Account, Asset, itxn, Txn, Global, assert } from '@algorandfoundation/algorand-typescript'\n\nexport class ${name} extends Contract {\n${body}}\n`
        }
        
        javascriptGenerator.forBlock["global_state"] = function(block: any) {
          const name = block.getFieldValue("NAME")
          const type = block.getFieldValue("TYPE")
          return `  ${name} = GlobalState<${type}>()\n`
        }
        
        javascriptGenerator.forBlock["local_state"] = function(block: any) {
          const name = block.getFieldValue("NAME")
          const type = block.getFieldValue("TYPE")
          return `  ${name} = LocalState<${type}>()\n`
        }
        
        javascriptGenerator.forBlock["abimethod"] = function(block: any) {
          const name = block.getFieldValue("NAME")
          const params = javascriptGenerator.valueToCode(block, "PARAMS", Order.ATOMIC) || ""
          const body = javascriptGenerator.statementToCode(block, "BODY")
          return `  @abimethod()\n  ${name}(${params}): void {\n${body}  }\n\n`
        }
        
        javascriptGenerator.forBlock["assert"] = function(block: any) {
          const condition = javascriptGenerator.valueToCode(block, "CONDITION", Order.ATOMIC) || "true"
          return `    assert(${condition})\n`
        }
        
        javascriptGenerator.forBlock["itxn_payment"] = function(block: any) {
          const receiver = javascriptGenerator.valueToCode(block, "RECEIVER", Order.ATOMIC) || "Txn.sender"
          const amount = javascriptGenerator.valueToCode(block, "AMOUNT", Order.ATOMIC) || "0"
          return `    itxn.payment({\n      receiver: ${receiver},\n      amount: ${amount}\n    }).submit()\n`
        }
        
        javascriptGenerator.forBlock["itxn_asset_transfer"] = function(block: any) {
          const receiver = javascriptGenerator.valueToCode(block, "RECEIVER", Order.ATOMIC) || "Txn.sender"
          const asset = javascriptGenerator.valueToCode(block, "ASSET", Order.ATOMIC) || "Asset()"
          const amount = javascriptGenerator.valueToCode(block, "AMOUNT", Order.ATOMIC) || "0"
          return `    itxn.assetTransfer({\n      assetReceiver: ${receiver},\n      xferAsset: ${asset},\n      assetAmount: ${amount}\n    }).submit()\n`
        }
        
        javascriptGenerator.forBlock["global_current_app_address"] = function() {
          return ["Global.currentApplicationAddress", Order.MEMBER]
        }
        
        javascriptGenerator.forBlock["global_latest_timestamp"] = function() {
          return ["Global.latestTimestamp", Order.MEMBER]
        }
        
        javascriptGenerator.forBlock["txn_sender"] = function() {
          return ["Txn.sender", Order.MEMBER]
        }
        
        javascriptGenerator.forBlock["state_value"] = function(block: any) {
          const state = block.getFieldValue("STATE")
          return [`this.${state}.value`, Order.MEMBER]
        }
        
        javascriptGenerator.forBlock["set_state_value"] = function(block: any) {
          const state = block.getFieldValue("STATE")
          const value = javascriptGenerator.valueToCode(block, "VALUE", Order.ATOMIC) || "0"
          return `    this.${state}.value = ${value}\n`
        }
        
        javascriptGenerator.forBlock["text_value"] = function(block: any) {
          const text = block.getFieldValue("TEXT")
          return [`"${text}"`, Order.ATOMIC]
        }
        
        javascriptGenerator.forBlock["number_value"] = function(block: any) {
          const num = block.getFieldValue("NUM")
          return [String(num), Order.ATOMIC]
        }
        
        javascriptGenerator.forBlock["comparison"] = function(block: any) {
          const a = javascriptGenerator.valueToCode(block, "A", Order.RELATIONAL) || "0"
          const op = block.getFieldValue("OP")
          const b = javascriptGenerator.valueToCode(block, "B", Order.RELATIONAL) || "0"
          return [`${a} ${op} ${b}`, Order.RELATIONAL]
        }
        
        javascriptGenerator.forBlock["param_def"] = function(block: any) {
          const name = block.getFieldValue("NAME")
          const type = block.getFieldValue("TYPE")
          return [`${name}: ${type}`, Order.ATOMIC]
        }
        
        javascriptGenerator.forBlock["create_application"] = function(block: any) {
          const body = javascriptGenerator.statementToCode(block, "BODY")
          return `  @abimethod()\n  createApplication(): void {\n${body}  }\n\n`
        }
        
        javascriptGenerator.forBlock["const_declaration"] = function(block: any) {
          const name = block.getFieldValue("NAME")
          const value = javascriptGenerator.valueToCode(block, "VALUE", Order.ATOMIC) || "0"
          return `    const ${name} = ${value}\n`
        }
        
        javascriptGenerator.forBlock["math_operation"] = function(block: any) {
          const a = javascriptGenerator.valueToCode(block, "A", Order.ATOMIC) || "0"
          const op = block.getFieldValue("OP")
          const b = javascriptGenerator.valueToCode(block, "B", Order.ATOMIC) || "0"
          return [`${a} ${op} ${b}`, Order.ATOMIC]
        }
        
        const categories = [
          {
            name: "Contract",
            colour: "230",
            blocks: ["contract_class", "create_application", "abimethod"]
          },
          {
            name: "State",
            colour: "290",
            blocks: ["global_state", "local_state", "state_value", "set_state_value"]
          },
          {
            name: "Transactions",
            colour: "160",
            blocks: ["itxn_payment", "itxn_asset_transfer"]
          },
          {
            name: "Logic",
            colour: "0",
            blocks: ["assert", "comparison"]
          },
          {
            name: "Globals",
            colour: "290",
            blocks: ["global_current_app_address", "global_latest_timestamp", "txn_sender"]
          },
          {
            name: "Values",
            colour: "160",
            blocks: ["text_value", "number_value", "param_def", "const_declaration", "math_operation"]
          }
        ]

        const xml = `<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">` +
          categories.map(cat => 
            `<category name="${cat.name}" colour="${cat.colour}">` + 
            cat.blocks.map(b => `<block type="${b}"></block>`).join("") + 
            `</category>`
          ).join("") +
          `</xml>`

        setToolboxXml(xml)
        onToolboxXml(xml)
        setLoading(false)
      } catch (error) {
        console.error("Failed to load blocks:", error)
        setLoading(false)
      }
    })()
  }, [onToolboxXml])

  return null
}
