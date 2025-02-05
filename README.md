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

## Model Selection
By default, this server uses the Qwen-Max model. 
The Qwen series offers several commercial models with different capabilities:

### Qwen-Max
Provides the best inference performance, especially for complex and multi-step tasks.

Context window: 32,768 tokens
- Max input: 30,720 tokens
- Max output: 8,192 tokens
- Pricing: $0.0016/1K tokens (input), $0.0064/1K tokens (output)
- Free quota: 1 million tokens

Available versions:

- qwen-max (Stable)
- qwen-max-latest (Latest)
- qwen-max-2025-01-25 (Snapshot, also known as qwen-max-0125 or Qwen2.5-Max)

### Qwen-Plus
Balanced combination of performance, speed, and cost, ideal for moderately complex tasks.

Context window: 131,072 tokens
- Max input: 129,024 tokens
- Max output: 8,192 tokens
- Pricing: $0.0004/1K tokens (input), $0.0012/1K tokens (output)
- Free quota: 1 million tokens

Available versions:

- qwen-plus (Stable)
- qwen-plus-latest (Latest)
- qwen-plus-2025-01-25 (Snapshot, also known as qwen-plus-0125)

### Qwen-Turbo
Fast speed and low cost, suitable for simple tasks.

- Context window: 1,000,000 tokens
- Max input: 1,000,000 tokens
- Max output: 8,192 tokens
- Pricing: $0.00005/1K tokens (input), $0.0002/1K tokens (output)
- Free quota: 1 million tokens

Available versions:

- qwen-turbo (Stable)
- qwen-turbo-latest (Latest)
- qwen-turbo-2024-11-01 (Snapshot, also known as qwen-turbo-1101)

To modify the model, update the model name in src/index.ts:

```typescript
// For Qwen-Max (default)
model: "qwen-max"

// For Qwen-Plus
model: "qwen-plus"

// For Qwen-Turbo
model: "qwen-turbo"
```

For more detailed information about available models, visit the Alibaba Cloud Model Documentation https://www.alibabacloud.com/help/en/model-studio/getting-started/models?spm=a3c0i.23458820.2359477120.1.446c7d3f9LT0FY.

## Project Structure
```
qwen-max-mcp/
├── src/
│   ├── index.ts             # Main server implementation
├── build/                   # Compiled files
│   ├── index.js
├── LICENSE
├── README.md
├── package.json
├── package-lock.json
└── tsconfig.json
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

- Text generation with Qwen models
- Configurable parameters (max_tokens, temperature)
- Error handling
- MCP protocol support
- Claude Desktop integration
- Support for all Qwen commercial models (Max, Plus, Turbo)
- Extensive token context windows

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
## The Temperature Parameter

The temperature parameter controls the randomness of the model's output:

Lower values (0.0-0.7): More focused and deterministic outputs
Higher values (0.7-1.0): More creative and varied outputs

Recommended temperature settings by task:

Code generation: 0.0-0.3
Technical writing: 0.3-0.5
General tasks: 0.7 (default)
Creative writing: 0.8-1.0

## Error Handling

The server provides detailed error messages for common issues:

API authentication errors
Invalid parameters
Rate limiting
Network issues
Token limit exceeded
Model availability issues

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
MIT