# OBSIDIAN // DEEP NETWORK

A fictional dark cyberpunk terminal with animated matrix rain, tactical radar, simulated terminal commands, a custom 404 page, and an AI chat panel.

## AI setup on Vercel

The AI chat uses the OpenAI Responses API through a serverless function at `/api/chat`. The API key is kept server-side and must never be placed in browser JavaScript.

1. Open the Vercel dashboard and select the **obsedian** project.
2. Go to **Settings → Environment Variables**.
3. Add `OPENAI_API_KEY` with your OpenAI API key as the value.
4. Enable it for Production (and Preview if you want preview deployments to use AI).
5. Save, then redeploy the latest deployment.

The AI endpoint uses the `gpt-4.1-mini` model. API usage may incur charges under your OpenAI API account. Chat will display a setup error until the environment variable is configured.

## Files

- `index.html` — main terminal, radar, loading screen, and AI chat UI.
- `404.html` — custom dark-network 404 page.
- `api/chat.js` — server-side AI endpoint.

## Safety

The terminal's cyber commands, network nodes, packet data, and radar are visual simulations. The AI assistant can explain concepts and help with coding, but it does not run commands or access real targets.

## Deployment

The repository is designed for Vercel. Its `api/chat.js` serverless function requires Vercel; opening `index.html` directly as a local file will not provide the AI API endpoint.
