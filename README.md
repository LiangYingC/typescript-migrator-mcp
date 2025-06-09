# TypeScript Migrator MCP

An AI assistance tool that intelligently converts JavaScript files to TypeScript while preserving code logic and following best practices.

## Features

- Automatic JavaScript to TypeScript conversion
- Smart type inference based on code context
- Maintains original code logic and comments
- Supports custom conversion rules
- Language-aware responses (supports multiple languages)
- Handles complex type definitions and module imports

## Setup

### In Cursor

1. Open Cursor settings
2. Go to AI > Model Context Protocol
3. Add a new MCP with the following configuration:
   ```json
   {
     "name": "typescript-migrator-mcp",
     "command": "npx typescript-migrator-mcp",
     "enabled": true
   }
   ```

## Usage

This MCP is designed to work with AI coding assistants like Cursor. To use it:

1. Make sure your AI assistant has this MCP configured (see Setup section)
2. In your conversation with the AI assistant, simply ask it to convert your JavaScript file to TypeScript:

Example commands:

```
"Please convert src/components/Button.js to TypeScript"
"Help me migrate utils/helpers.js to TypeScript"
```

The AI assistant will:

- Analyze your JavaScript file
- Create a TypeScript version with appropriate type annotations
- Preserve all original logic and comments
- Follow TypeScript best practices
- Handle module imports/exports
- Provide a summary of the conversion

## Configuration

- Set `LANGUAGE_CODE` environment variable for responses in your preferred language
- Create a custom `rules.md` file in your project root for custom conversion rules

## Requirements

- An AI coding assistant that supports MCP (e.g., Cursor)
- Node.js >= 18.0.0
- TypeScript in your project dependencies

---

# TypeScript 轉換 MCP

一個 AI 輔助工具，能夠智能地將 JavaScript 檔案轉換為 TypeScript，同時保留程式碼邏輯並遵循最佳實踐。

## 功能特點

- 自動將 JavaScript 轉換為 TypeScript
- 基於程式碼上下文的智慧型別推斷
- 保留原始程式碼邏輯和註解
- 支援自訂轉換規則
- 支援多語言回應
- 處理複雜型別定義和模組導入

## 設定

### 在 Cursor 中設定

1. 開啟 Cursor 設定
2. 前往 AI > Model Context Protocol
3. 新增一個 MCP，設定如下：
   ```json
   {
     "name": "typescript-migrator-mcp",
     "command": "npx typescript-migrator-mcp",
     "enabled": true
   }
   ```

## 使用方式

這個 MCP 是設計來與 AI 編碼助手（如 Cursor）一起使用的。使用步驟：

1. 確保您的 AI 助手已配置此 MCP（請參考設定章節）
2. 在與 AI 助手的對話中，直接要求它將 JavaScript 檔案轉換為 TypeScript：

範例指令：

```
"請將 src/components/Button.js 轉換成 TypeScript"
"幫我把 utils/helpers.js 遷移到 TypeScript"
```

AI 助手會：

- 分析您的 JavaScript 檔案
- 創建帶有適當型別註解的 TypeScript 版本
- 保留所有原始邏輯和註解
- 遵循 TypeScript 最佳實踐
- 處理模組導入/導出
- 提供轉換摘要

## 配置

- 設置 `LANGUAGE_CODE` 環境變數以獲得您偏好語言的回應
- 在專案根目錄創建 `rules.md` 檔案以自訂轉換規則

## 系統需求

- 支援 MCP 的 AI 編碼助手（如 Cursor）
- Node.js >= 18.0.0
- 專案相依套件中需包含 TypeScript
