# Data Detective

Data Detective is a responsive CSV-analysis web app with a conversational assistant, voice input/output, hosted Python analysis, charts, and downloadable reports.

## How it works

- Frontend: `data-detective/index.html` (no build step required).
- Server endpoint: `api/data-detective.js` (Vercel serverless function).
- AI: OpenAI Responses API with the hosted Code Interpreter tool, which runs Python in an OpenAI-managed sandbox.
- Voice: browser Speech Recognition where supported, and device/browser Speech Synthesis for spoken answers.
- Follow-ups: recent conversation history is sent from the current browser session along with the same CSV.

## Deploy

1. Deploy this repository to Vercel (or wait for its connected GitHub deployment).
2. In Vercel, open **Project → Settings → Environment Variables**.
3. Add `OPENAI_API_KEY` with an API key from the OpenAI Platform. Optionally set `OPENAI_MODEL` (defaults to `gpt-4.1`).
4. Enable the variable for the environments you use, save, then redeploy.
5. Open `/data-detective/` on the deployed site.

The key must only exist in Vercel server-side environment variables; never add it to the HTML or commit it to GitHub. ChatGPT subscriptions and API billing are separate. Responses API and Code Interpreter usage may incur API charges.

## Try it

Tap **Load sample sales data**, ask a question such as “Which category has the highest revenue? Show a chart”, and try a follow-up. The app can download a Markdown report and a generated PNG chart; use **Print / Save PDF** to save the report as a PDF in a browser that supports printing.

## Notes and limitations

- Demo upload limit is 100 KB; the backend enforces a 100,000-character limit.
- CSV content is sent to the server and to OpenAI for analysis. Do not upload secrets, personal data, or confidential files.
- Voice input support depends on browser and microphone permissions; Chrome on HTTPS is recommended.
- Conversation state is held in the current page session, not a permanent database. Refreshing the page clears chat history.
- The app asks the hosted Python tool to analyze data and create a chart, but model-generated analysis can still be wrong. Validate important conclusions.
- Reports are generated in the browser from the answer and dataset metadata. The Markdown report and chart are separate downloads.
