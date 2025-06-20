# TypeScript Migrator MCP

This MCP server let you easily converts JavaScript files to TypeScript with AI agent.

## Setup

Add the following configuration to your MCP settings JSON:

```json
{
  "mcpServers": {
    "typescript-migrator-mcp": {
      "command": "npx",
      "args": ["-y", "typescript-migrator-mcp"]
    }
  }
}
```

## Usage

Once configured, your AI agent can convert JavaScript files to TypeScript by calling the conversion tool with a file path:

```
Convert @test/myFile.js to TypeScript
```

The tool will:

1. Analyze the JavaScript file and its dependencies
2. Generate appropriate TypeScript types and interfaces
3. Preserve original logic while adding type safety
4. Ensure lint and type errors are fixed
5. Summarize the work of AI

## Configuration

### Custom Rules

To add your own conversion rules, create a custom markdown file with your rules and specify its path in the environment configuration:

```json
{
  "mcpServers": {
    "typescript-migrator-mcp": {
      "command": "npx",
      "args": ["-y", "typescript-migrator-mcp"],
      "env": {
        "CUSTOM_RULES_MD_FILE_PATH": "/path/to/your/custom-rules.md"
      }
    }
  }
}
```

## License

Apache 2.0
