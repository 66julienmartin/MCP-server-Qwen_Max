# Qwen Max MCP Server

A Model Context Protocol (MCP) server implementation for the Qwen Max language model.

[![smithery badge](https://smithery.ai/badge/@66julienmartin/mcp-server-qwen_max)](https://smithery.ai/server/@66julienmartin/mcp-server-qwen_max)

<a href="https://glama.ai/mcp/servers/1v7po9oa9w"><img width="380" height="200" src="https://glama.ai/mcp/servers/1v7po9oa9w/badge" alt="Qwen Max Server MCP server" /></a>

Why Node.js?
This implementation uses Node.js/TypeScript as it currently provides the most stable and reliable integration 
with MCP servers compared to other languages like Python. The Node.js SDK for MCP offers better type safety, 
error handling, and compatibility with Claude Desktop.

## Prerequisites

- Node.js (v18 or higher)
- npm
- Claude Desktop
- Dashscope API key

## Installation

### Installing via Smithery

To install Qwen Max MCP Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@66julienmartin/mcp-server-qwen_max):

```bash
npx -y @smithery/cli install @66julienmartin/mcp-server-qwen_max --client claude
```

### Manual Installation
```bash
git clone https://github.com/66julienmartin/mcp-server-qwen-max.git
cd Qwen_Max
npm install
```

## Configuration

1. Create a `.env` file in the project root:
```
DASHSCOPE_API_KEY=your-api-key-here
```

2. Update Claude Desktop configuration:
```json
{
  "mcpServers": {
    "qwen_max": {
      "command": "node",
      "args": ["/path/to/Qwen_Max/build/index.js"],
      "env": {
        "DASHSCOPE_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

## Development

```bash
npm run dev     # Watch mode
npm run build   # Build
npm run start   # Start server
```

## Features

- Text generation with Qwen Max
- Configurable parameters (max_tokens, temperature)
- Error handling
- MCP protocol support
- Claude Desktop integration

## API Usage

```typescript
// Example tool call
{
  "name": "qwen_max",
  "arguments": {
    "prompt": "Your prompt here",
    "max_tokens": 8192,
    "temperature": 0.7
  }
}
```
