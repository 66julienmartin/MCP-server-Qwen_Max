#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { 
    ListToolsRequestSchema, 
    CallToolRequestSchema, 
    ErrorCode, 
    McpError 
} from "@modelcontextprotocol/sdk/types.js";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const QWEN_BASE_URL = "https://dashscope-intl.aliyuncs.com/compatible-mode/v1";
const API_KEY = process.env.DASHSCOPE_API_KEY;

if (!API_KEY) {
    throw new Error("DASHSCOPE_API_KEY environment variable is required");
}

interface QwenMaxArgs {
    prompt: string;
    max_tokens?: number;
    temperature?: number;
}

class QwenMaxServer {
    private server: Server;
    private openai: OpenAI;

    constructor() {
        this.server = new Server(
            { name: "qwen_max", version: "1.0.0" },
            { capabilities: { tools: {} } }
        );

        this.openai = new OpenAI({
            apiKey: API_KEY,
            baseURL: QWEN_BASE_URL
        });

        this.setupHandlers();
        this.setupErrorHandling();
    }

    private setupErrorHandling(): void {
        this.server.onerror = (error: Error): void => {
            console.error("[MCP Error]", error);
        };

        process.on("SIGINT", async (): Promise<void> => {
            await this.server.close();
            process.exit(0);
        });
    }

    private setupHandlers(): void {
        this.server.setRequestHandler(
            ListToolsRequestSchema,
            async () => ({
                tools: [{
                    name: "qwen_max",
                    description: "Generate text using Qwen Max model",
                    inputSchema: {
                        type: "object",
                        properties: {
                            prompt: {
                                type: "string",
                                description: "The text prompt to generate content from"
                            },
                            max_tokens: {
                                type: "number",
                                description: "Maximum number of tokens to generate",
                                default: 8192
                            },
                            temperature: {
                                type: "number",
                                description: "Sampling temperature (0-2)",
                                default: 0.7,
                                minimum: 0,
                                maximum: 2
                            }
                        },
                        required: ["prompt"]
                    }
                }]
            })
        );

        this.server.setRequestHandler(
            CallToolRequestSchema,
            async (request) => {
                if (request.params.name !== "qwen_max") {
                    throw new McpError(
                        ErrorCode.MethodNotFound,
                        `Unknown tool: ${request.params.name}`
                    );
                }

                const { prompt, max_tokens = 8192, temperature = 0.7 } = 
                    request.params.arguments as QwenMaxArgs;

                try {
                    const completion = await this.openai.chat.completions.create({
                        model: "qwen-max-latest",
                        messages: [{ role: "user", content: prompt }],
                        max_tokens,
                        temperature
                    });

                    return {
                        content: [{
                            type: "text",
                            text: completion.choices[0].message.content || ""
                        }]
                    };
                } catch (error: any) {
                    console.error("Qwen API Error:", error);
                    throw new McpError(
                        ErrorCode.InternalError,
                        `Qwen API error: ${error.message}`
                    );
                }
            }
        );
    }

    async run(): Promise<void> {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        console.error("Qwen Max MCP server running on stdio");
    }
}

const server = new QwenMaxServer();
server.run().catch(console.error);