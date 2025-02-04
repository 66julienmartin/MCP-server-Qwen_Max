# Qwen Max MCP Server

A Model Context Protocol (MCP) server implementation for the Qwen Max language model.

## Prerequisites

- Node.js (v18 or higher)
- npm
- Claude Desktop
- Dashscope API key

## Installation

```bash
git clone https://github.com/66julienmartin/MCP-server-Qwen-Max-model.git
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