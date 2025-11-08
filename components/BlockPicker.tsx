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
          return `import { Contract, GlobalState, LocalState, Box, BoxMap, abimethod, uint64, bytes, Account, Asset, Application, itxn, Txn, Global, assert, log, gtxn, Uint64, BigUint, Bytes } from '@algorandfoundation/algorand-typescript'\n\nexport class ${name} extends Contract {\n${body}}\n`
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
        
        javascriptGenerator.forBlock["log"] = function(block: any) {
          const message = javascriptGenerator.valueToCode(block, "MESSAGE", Order.ATOMIC) || '""'
          return `    log(${message})\n`
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
          const params = javascriptGenerator.valueToCode(block, "PARAMS", Order.ATOMIC) || ""
          const body = javascriptGenerator.statementToCode(block, "BODY")
          return `  createApplication(${params}): void {\n${body}  }\n\n`
        }
        
        javascriptGenerator.forBlock["update_application"] = function(block: any) {
          const body = javascriptGenerator.statementToCode(block, "BODY")
          return `  updateApplication(): void {\n${body}  }\n\n`
        }
        
        javascriptGenerator.forBlock["delete_application"] = function(block: any) {
          const body = javascriptGenerator.statementToCode(block, "BODY")
          return `  deleteApplication(): void {\n${body}  }\n\n`
        }
        
        javascriptGenerator.forBlock["optin_application"] = function(block: any) {
          const body = javascriptGenerator.statementToCode(block, "BODY")
          return `  optInToApplication(): void {\n${body}  }\n\n`
        }
        
        javascriptGenerator.forBlock["closeout_application"] = function(block: any) {
          const body = javascriptGenerator.statementToCode(block, "BODY")
          return `  closeOutOfApplication(): void {\n${body}  }\n\n`
        }
        
        javascriptGenerator.forBlock["itxn_asset_create"] = function(block: any) {
          const total = javascriptGenerator.valueToCode(block, "TOTAL", Order.ATOMIC) || "0"
          const decimals = javascriptGenerator.valueToCode(block, "DECIMALS", Order.ATOMIC) || "0"
          const unitName = javascriptGenerator.valueToCode(block, "UNIT_NAME", Order.ATOMIC) || '""'
          const assetName = javascriptGenerator.valueToCode(block, "ASSET_NAME", Order.ATOMIC) || '""'
          return `    itxn.assetConfig({\n      total: ${total},\n      decimals: ${decimals},\n      unitName: ${unitName},\n      assetName: ${assetName},\n      fee: 0\n    }).submit()\n`
        }
        
        javascriptGenerator.forBlock["itxn_asset_optin"] = function(block: any) {
          const asset = javascriptGenerator.valueToCode(block, "ASSET", Order.ATOMIC) || "Asset()"
          return `    itxn.assetTransfer({\n      assetReceiver: Global.currentApplicationAddress,\n      xferAsset: ${asset},\n      assetAmount: 0,\n      fee: 0\n    }).submit()\n`
        }
        
        javascriptGenerator.forBlock["itxn_asset_freeze"] = function(block: any) {
          const account = javascriptGenerator.valueToCode(block, "ACCOUNT", Order.ATOMIC) || "Txn.sender"
          const asset = javascriptGenerator.valueToCode(block, "ASSET", Order.ATOMIC) || "Asset()"
          const frozen = block.getFieldValue("FROZEN")
          return `    itxn.assetFreeze({\n      freezeAccount: ${account},\n      freezeAsset: ${asset},\n      frozen: ${frozen},\n      fee: 0\n    }).submit()\n`
        }
        
        javascriptGenerator.forBlock["itxn_asset_revoke"] = function(block: any) {
          const from = javascriptGenerator.valueToCode(block, "FROM", Order.ATOMIC) || "Txn.sender"
          const asset = javascriptGenerator.valueToCode(block, "ASSET", Order.ATOMIC) || "Asset()"
          const amount = javascriptGenerator.valueToCode(block, "AMOUNT", Order.ATOMIC) || "0"
          return `    itxn.assetTransfer({\n      assetReceiver: Global.currentApplicationAddress,\n      xferAsset: ${asset},\n      assetSender: ${from},\n      assetAmount: ${amount},\n      fee: 0\n    }).submit()\n`
        }
        
        javascriptGenerator.forBlock["itxn_asset_config"] = function(block: any) {
          const asset = javascriptGenerator.valueToCode(block, "ASSET", Order.ATOMIC) || "Asset()"
          const manager = javascriptGenerator.valueToCode(block, "MANAGER", Order.ATOMIC) || "Global.currentApplicationAddress"
          return `    itxn.assetConfig({\n      configAsset: ${asset},\n      manager: ${manager},\n      fee: 0\n    }).submit()\n`
        }
        
        javascriptGenerator.forBlock["itxn_asset_delete"] = function(block: any) {
          const asset = javascriptGenerator.valueToCode(block, "ASSET", Order.ATOMIC) || "Asset()"
          return `    itxn.assetConfig({\n      configAsset: ${asset},\n      fee: 0\n    }).submit()\n`
        }
        
        javascriptGenerator.forBlock["itxn_app_call"] = function(block: any) {
          const appId = javascriptGenerator.valueToCode(block, "APP_ID", Order.ATOMIC) || "Application(0)"
          const appArgs = javascriptGenerator.valueToCode(block, "APP_ARGS", Order.ATOMIC) || "[]"
          return `    itxn.applicationCall({\n      appId: ${appId},\n      appArgs: ${appArgs},\n      fee: 0\n    }).submit()\n`
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
        
        javascriptGenerator.forBlock["if_statement"] = function(block: any) {
          const condition = javascriptGenerator.valueToCode(block, "CONDITION", Order.ATOMIC) || "true"
          const doCode = javascriptGenerator.statementToCode(block, "DO")
          return `    if (${condition}) {\n${doCode}    }\n`
        }
        
        javascriptGenerator.forBlock["if_else_statement"] = function(block: any) {
          const condition = javascriptGenerator.valueToCode(block, "CONDITION", Order.ATOMIC) || "true"
          const doCode = javascriptGenerator.statementToCode(block, "DO")
          const elseCode = javascriptGenerator.statementToCode(block, "ELSE")
          return `    if (${condition}) {\n${doCode}    } else {\n${elseCode}    }\n`
        }
        
        javascriptGenerator.forBlock["while_loop"] = function(block: any) {
          const condition = javascriptGenerator.valueToCode(block, "CONDITION", Order.ATOMIC) || "true"
          const doCode = javascriptGenerator.statementToCode(block, "DO")
          return `    while (${condition}) {\n${doCode}    }\n`
        }
        
        javascriptGenerator.forBlock["for_loop"] = function(block: any) {
          const varName = block.getFieldValue("VAR")
          const list = javascriptGenerator.valueToCode(block, "LIST", Order.ATOMIC) || "[]"
          const doCode = javascriptGenerator.statementToCode(block, "DO")
          return `    for (const ${varName} of ${list}) {\n${doCode}    }\n`
        }
        
        javascriptGenerator.forBlock["return_statement"] = function(block: any) {
          const value = javascriptGenerator.valueToCode(block, "VALUE", Order.ATOMIC) || ""
          return `    return ${value}\n`
        }
        
        javascriptGenerator.forBlock["break_statement"] = function() {
          return `    break\n`
        }
        
        javascriptGenerator.forBlock["continue_statement"] = function() {
          return `    continue\n`
        }
        
        javascriptGenerator.forBlock["logical_operation"] = function(block: any) {
          const a = javascriptGenerator.valueToCode(block, "A", Order.LOGICAL_AND) || "true"
          const op = block.getFieldValue("OP")
          const b = javascriptGenerator.valueToCode(block, "B", Order.LOGICAL_AND) || "true"
          return [`${a} ${op} ${b}`, Order.LOGICAL_AND]
        }
        
        javascriptGenerator.forBlock["box_storage"] = function(block: any) {
          const name = block.getFieldValue("NAME")
          const type = block.getFieldValue("TYPE")
          return `  ${name} = Box<${type}>({ key: '${name}' })\n`
        }
        
        javascriptGenerator.forBlock["box_map"] = function(block: any) {
          const name = block.getFieldValue("NAME")
          const type = block.getFieldValue("TYPE")
          return `  ${name} = BoxMap${type}({ keyPrefix: '' })\n`
        }
        
        javascriptGenerator.forBlock["box_value"] = function(block: any) {
          const box = block.getFieldValue("BOX")
          return [`this.${box}.value`, Order.MEMBER]
        }
        
        javascriptGenerator.forBlock["set_box_value"] = function(block: any) {
          const box = block.getFieldValue("BOX")
          const value = javascriptGenerator.valueToCode(block, "VALUE", Order.ATOMIC) || "0"
          return `    this.${box}.value = ${value}\n`
        }
        
        javascriptGenerator.forBlock["box_exists"] = function(block: any) {
          const box = block.getFieldValue("BOX")
          return [`this.${box}.exists`, Order.MEMBER]
        }
        
        javascriptGenerator.forBlock["box_delete"] = function(block: any) {
          const box = block.getFieldValue("BOX")
          return `    this.${box}.delete()\n`
        }
        
        javascriptGenerator.forBlock["uint64_factory"] = function(block: any) {
          const value = javascriptGenerator.valueToCode(block, "VALUE", Order.ATOMIC) || "0"
          return [`Uint64(${value})`, Order.FUNCTION_CALL]
        }
        
        javascriptGenerator.forBlock["biguint_factory"] = function(block: any) {
          const value = javascriptGenerator.valueToCode(block, "VALUE", Order.ATOMIC) || "0"
          return [`BigUint(${value})`, Order.FUNCTION_CALL]
        }
        
        javascriptGenerator.forBlock["bytes_factory"] = function(block: any) {
          const value = javascriptGenerator.valueToCode(block, "VALUE", Order.ATOMIC) || '""'
          return [`Bytes(${value})`, Order.FUNCTION_CALL]
        }
        
        javascriptGenerator.forBlock["account_factory"] = function(block: any) {
          const address = javascriptGenerator.valueToCode(block, "ADDRESS", Order.ATOMIC) || '""'
          return [`Account(${address})`, Order.FUNCTION_CALL]
        }
        
        javascriptGenerator.forBlock["asset_factory"] = function(block: any) {
          const id = javascriptGenerator.valueToCode(block, "ID", Order.ATOMIC) || "0"
          return [`Asset(${id})`, Order.FUNCTION_CALL]
        }
        
        javascriptGenerator.forBlock["application_factory"] = function(block: any) {
          const id = javascriptGenerator.valueToCode(block, "ID", Order.ATOMIC) || "0"
          return [`Application(${id})`, Order.FUNCTION_CALL]
        }
        
        javascriptGenerator.forBlock["let_declaration"] = function(block: any) {
          const name = block.getFieldValue("NAME")
          const type = block.getFieldValue("TYPE")
          const value = javascriptGenerator.valueToCode(block, "VALUE", Order.ATOMIC) || "0"
          return `    let ${name}: ${type} = ${value}\n`
        }
        
        javascriptGenerator.forBlock["variable_get"] = function(block: any) {
          const varName = block.getFieldValue("VAR")
          return [varName, Order.ATOMIC]
        }
        
        javascriptGenerator.forBlock["variable_set"] = function(block: any) {
          const varName = block.getFieldValue("VAR")
          const value = javascriptGenerator.valueToCode(block, "VALUE", Order.ATOMIC) || "0"
          return `    ${varName} = ${value}\n`
        }
        
        const categories = [
          {
            name: "Contract",
            colour: "230",
            blocks: ["contract_class", "abimethod"]
          },
          {
            name: "Lifecycle",
            colour: "120",
            blocks: ["create_application", "update_application", "delete_application", "optin_application", "closeout_application"]
          },
          {
            name: "State",
            colour: "290",
            blocks: ["global_state", "local_state", "state_value", "set_state_value"]
          },
          {
            name: "Storage",
            colour: "260",
            blocks: ["box_storage", "box_map", "box_value", "set_box_value", "box_exists", "box_delete"]
          },
          {
            name: "Transactions",
            colour: "160",
            blocks: ["itxn_payment", "itxn_asset_transfer", "itxn_asset_create", "itxn_asset_optin", "itxn_asset_freeze", "itxn_asset_revoke", "itxn_asset_config", "itxn_asset_delete", "itxn_app_call"]
          },
          {
            name: "Logic",
            colour: "210",
            blocks: ["assert", "log", "comparison", "logical_operation", "if_statement", "if_else_statement", "while_loop", "for_loop", "return_statement", "break_statement", "continue_statement"]
          },
          {
            name: "Globals",
            colour: "290",
            blocks: ["global_current_app_address", "global_latest_timestamp", "txn_sender"]
          },
          {
            name: "Types",
            colour: "230",
            blocks: ["uint64_factory", "biguint_factory", "bytes_factory", "account_factory", "asset_factory", "application_factory"]
          },
          {
            name: "Values",
            colour: "160",
            blocks: ["text_value", "number_value", "param_def", "const_declaration", "let_declaration", "variable_get", "variable_set", "math_operation"]
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
