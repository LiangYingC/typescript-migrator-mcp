import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  InitializeRequestSchema,
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import {
  convertJsFileToolName,
  convertJsFileToolDescription,
  ConvertJsFileToolSchema,
  runConvertJsFileTool,
} from "./tools/convertJsFile.js";

const server = new Server(
  {
    name: "typescript-migrator-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(InitializeRequestSchema, async (request) => {
  return {
    protocolVersion: "2024-11-05",
    capabilities: {
      tools: {},
    },
    serverInfo: {
      name: "typescript-migrator-mcp",
      version: "1.0.0",
    },
  };
});

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: convertJsFileToolName,
        description: convertJsFileToolDescription,
        inputSchema: ConvertJsFileToolSchema,
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (!args) {
      throw new Error("missing arguments");
    }
    switch (name) {
      case convertJsFileToolName:
        return await runConvertJsFileTool(args as { filePath: string });
      default:
        throw new Error(`unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `error: ${
            error instanceof Error ? error.message : String(error)
          }`,
        },
      ],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("TypeScript Migrator MCP Server is running");
}

main().catch((error) => {
  console.error("TypeScript Migrator MCP Server start failed:", error);
  process.exit(1);
});
