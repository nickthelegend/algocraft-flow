"use client"

import React, { useEffect, useState } from "react"

export default function BlockPickerNoob({ 
  onToolboxXml 
}: { 
  onToolboxXml: (xml: string) => void 
}) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const Blockly = await import("blockly")
        const response = await fetch("/examples/blocks-noob.json")
        const blockDefs = await response.json()
        Blockly.defineBlocksWithJsonArray(blockDefs)
        
        const { javascriptGenerator, Order } = await import("blockly/javascript")
        
        javascriptGenerator.forBlock["simple_contract"] = function(block: any) {
          const name = block.getFieldValue("NAME")
          const body = javascriptGenerator.statementToCode(block, "BODY")
          return `import { Contract, GlobalState, Box, abimethod, uint64, Account, Asset, itxn, Txn, Global, assert, log } from '@algorandfoundation/algorand-typescript'\n\nexport class ${name} extends Contract {\n${body}}\n`
        }
        
        javascriptGenerator.forBlock["simple_storage"] = function(block: any) {
          const name = block.getFieldValue("NAME")
          const type = block.getFieldValue("TYPE")
          return `  ${name} = GlobalState<${type}>()\n`
        }
        
        javascriptGenerator.forBlock["simple_function"] = function(block: any) {
          const name = block.getFieldValue("NAME")
          const body = javascriptGenerator.statementToCode(block, "BODY")
          return `  @abimethod()\n  ${name}(): void {\n${body}  }\n\n`
        }
        
        javascriptGenerator.forBlock["simple_check"] = function(block: any) {
          const condition = javascriptGenerator.valueToCode(block, "CONDITION", Order.ATOMIC) || "true"
          return `    assert(${condition})\n`
        }
        
        javascriptGenerator.forBlock["simple_print"] = function(block: any) {
          const message = javascriptGenerator.valueToCode(block, "MESSAGE", Order.ATOMIC) || '""'
          return `    log(${message})\n`
        }
        
        javascriptGenerator.forBlock["simple_send_money"] = function(block: any) {
          const receiver = javascriptGenerator.valueToCode(block, "RECEIVER", Order.ATOMIC) || "Txn.sender"
          const amount = javascriptGenerator.valueToCode(block, "AMOUNT", Order.ATOMIC) || "0"
          return `    itxn.payment({\n      receiver: ${receiver},\n      amount: ${amount}\n    }).submit()\n`
        }
        
        javascriptGenerator.forBlock["simple_who_sent"] = function() {
          return ["Txn.sender", Order.MEMBER]
        }
        
        javascriptGenerator.forBlock["simple_my_address"] = function() {
          return ["Global.currentApplicationAddress", Order.MEMBER]
        }
        
        javascriptGenerator.forBlock["simple_get_data"] = function(block: any) {
          const name = block.getFieldValue("NAME")
          return [`this.${name}.value`, Order.MEMBER]
        }
        
        javascriptGenerator.forBlock["simple_save_data"] = function(block: any) {
          const name = block.getFieldValue("NAME")
          const value = javascriptGenerator.valueToCode(block, "VALUE", Order.ATOMIC) || "0"
          return `    this.${name}.value = ${value}\n`
        }
        
        javascriptGenerator.forBlock["simple_text"] = function(block: any) {
          const text = block.getFieldValue("TEXT")
          return [`"${text}"`, Order.ATOMIC]
        }
        
        javascriptGenerator.forBlock["simple_number"] = function(block: any) {
          const num = block.getFieldValue("NUM")
          return [String(num), Order.ATOMIC]
        }
        
        javascriptGenerator.forBlock["simple_if"] = function(block: any) {
          const condition = javascriptGenerator.valueToCode(block, "CONDITION", Order.ATOMIC) || "true"
          const doCode = javascriptGenerator.statementToCode(block, "DO")
          return `    if (${condition}) {\n${doCode}    }\n`
        }
        
        javascriptGenerator.forBlock["simple_compare"] = function(block: any) {
          const a = javascriptGenerator.valueToCode(block, "A", Order.RELATIONAL) || "0"
          const op = block.getFieldValue("OP")
          const b = javascriptGenerator.valueToCode(block, "B", Order.RELATIONAL) || "0"
          return [`${a} ${op} ${b}`, Order.RELATIONAL]
        }
        
        javascriptGenerator.forBlock["simple_setup"] = function(block: any) {
          const body = javascriptGenerator.statementToCode(block, "BODY")
          return `  createApplication(): void {\n${body}  }\n\n`
        }
        
        javascriptGenerator.forBlock["simple_create_token"] = function(block: any) {
          const name = javascriptGenerator.valueToCode(block, "NAME", Order.ATOMIC) || '""'
          const total = javascriptGenerator.valueToCode(block, "TOTAL", Order.ATOMIC) || "0"
          const symbol = javascriptGenerator.valueToCode(block, "SYMBOL", Order.ATOMIC) || '""'
          return `    itxn.assetConfig({\n      total: ${total},\n      decimals: 0,\n      unitName: ${symbol},\n      assetName: ${name},\n      fee: 0\n    }).submit()\n`
        }
        
        javascriptGenerator.forBlock["simple_send_token"] = function(block: any) {
          const receiver = javascriptGenerator.valueToCode(block, "RECEIVER", Order.ATOMIC) || "Txn.sender"
          const asset = javascriptGenerator.valueToCode(block, "ASSET", Order.ATOMIC) || "Asset()"
          const amount = javascriptGenerator.valueToCode(block, "AMOUNT", Order.ATOMIC) || "0"
          return `    itxn.assetTransfer({\n      assetReceiver: ${receiver},\n      xferAsset: ${asset},\n      assetAmount: ${amount}\n    }).submit()\n`
        }
        
        javascriptGenerator.forBlock["simple_box_storage"] = function(block: any) {
          const name = block.getFieldValue("NAME")
          return `  ${name} = Box<string>({ key: '${name}' })\n`
        }
        
        javascriptGenerator.forBlock["simple_while"] = function(block: any) {
          const condition = javascriptGenerator.valueToCode(block, "CONDITION", Order.ATOMIC) || "true"
          const doCode = javascriptGenerator.statementToCode(block, "DO")
          return `    while (${condition}) {\n${doCode}    }\n`
        }
        
        javascriptGenerator.forBlock["simple_for"] = function(block: any) {
          const varName = block.getFieldValue("VAR")
          const list = javascriptGenerator.valueToCode(block, "LIST", Order.ATOMIC) || "[]"
          const doCode = javascriptGenerator.statementToCode(block, "DO")
          return `    for (const ${varName} of ${list}) {\n${doCode}    }\n`
        }
        
        javascriptGenerator.forBlock["simple_variable"] = function(block: any) {
          const name = block.getFieldValue("NAME")
          const value = javascriptGenerator.valueToCode(block, "VALUE", Order.ATOMIC) || "0"
          return `    const ${name} = ${value}\n`
        }
        
        javascriptGenerator.forBlock["simple_get_variable"] = function(block: any) {
          const varName = block.getFieldValue("VAR")
          return [varName, Order.ATOMIC]
        }
        
        javascriptGenerator.forBlock["simple_math"] = function(block: any) {
          const a = javascriptGenerator.valueToCode(block, "A", Order.ATOMIC) || "0"
          const op = block.getFieldValue("OP")
          const b = javascriptGenerator.valueToCode(block, "B", Order.ATOMIC) || "0"
          return [`${a} ${op} ${b}`, Order.ATOMIC]
        }
        
        javascriptGenerator.forBlock["simple_and_or"] = function(block: any) {
          const a = javascriptGenerator.valueToCode(block, "A", Order.LOGICAL_AND) || "true"
          const op = block.getFieldValue("OP")
          const b = javascriptGenerator.valueToCode(block, "B", Order.LOGICAL_AND) || "true"
          return [`${a} ${op} ${b}`, Order.LOGICAL_AND]
        }
        
        javascriptGenerator.forBlock["simple_return"] = function(block: any) {
          const value = javascriptGenerator.valueToCode(block, "VALUE", Order.ATOMIC) || ""
          return `    return ${value}\n`
        }
        
        javascriptGenerator.forBlock["simple_current_time"] = function() {
          return ["Global.latestTimestamp", Order.MEMBER]
        }
        
        const categories = [
          {
            name: "🎯 Start Here",
            colour: "230",
            blocks: ["simple_contract", "simple_setup", "simple_function"]
          },
          {
            name: "💾 Data Storage",
            colour: "290",
            blocks: ["simple_storage", "simple_get_data", "simple_save_data", "simple_box_storage"]
          },
          {
            name: "💰 Money & Tokens",
            colour: "160",
            blocks: ["simple_send_money", "simple_create_token", "simple_send_token"]
          },
          {
            name: "❓ Logic & Checks",
            colour: "210",
            blocks: ["simple_check", "simple_if", "simple_compare", "simple_and_or"]
          },
          {
            name: "🔁 Loops",
            colour: "120",
            blocks: ["simple_while", "simple_for"]
          },
          {
            name: "📌 Variables",
            colour: "330",
            blocks: ["simple_variable", "simple_get_variable", "simple_return"]
          },
          {
            name: "🔧 Tools",
            colour: "290",
            blocks: ["simple_who_sent", "simple_my_address", "simple_current_time", "simple_print"]
          },
          {
            name: "📝 Values & Math",
            colour: "160",
            blocks: ["simple_text", "simple_number", "simple_math"]
          }
        ]

        const xml = `<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">` +
          categories.map(cat => 
            `<category name="${cat.name}" colour="${cat.colour}">` + 
            cat.blocks.map(b => `<block type="${b}"></block>`).join("") + 
            `</category>`
          ).join("") +
          `</xml>`

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
