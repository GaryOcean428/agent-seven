"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xaiConfig = void 0;
exports.xaiConfig = {
    apiKey: import.meta.env.VITE_XAI_API_KEY || '',
    baseUrl: 'https://api.x.ai/v1',
    apiVersion: '2024-01',
    defaultModel: 'grok-beta',
    maxTokens: 4096,
    temperature: 0.7,
    models: {
        beta: 'grok-beta',
        pro: 'grok-pro'
    },
    rateLimits: {
        requestsPerMinute: 60,
        tokensPerMinute: 100000
    }
};
