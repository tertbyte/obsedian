export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: "AI is not configured yet. Add OPENAI_API_KEY in Vercel → Project Settings → Environment Variables, then redeploy."
    });
  }

  const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";
  if (!message) return res.status(400).json({ error: "Enter a message first." });
  if (message.length > 2000) return res.status(413).json({ error: "Message is too long (maximum 2000 characters)." });

  try {
    const upstream = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        instructions: "You are J.A.R.V.I.S., a polished, calm, highly capable personal AI assistant with a refined futuristic tone, inspired by cinematic voice assistants. Be courteous, concise, perceptive, and occasionally witty without overdoing it. Help with general questions, coding, web development, learning, and the OBSIDIAN website. Help with coding, web development, defensive cybersecurity, learning, and the site's features. Keep cybersecurity guidance legal, authorized, and lab-focused. Do not claim to access real systems, scan live targets, or run commands; this is a chat assistant only. If asked for dangerous real-world intrusion or credential theft, refuse briefly and redirect to safe defensive learning. Use clear plain text.",
        input: message,
        max_output_tokens: 500
      })
    });

    const data = await upstream.json();
    if (!upstream.ok) {
      console.error("OpenAI API error:", data?.error?.type || upstream.status);
      return res.status(502).json({ error: "AI provider request failed. Check your API key, API billing, and model access." });
    }

    const reply = typeof data.output_text === "string" ? data.output_text.trim() : "";
    if (!reply) return res.status(502).json({ error: "The AI returned an empty response. Please try again." });
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ reply });
  } catch (error) {
    console.error("JARVIS AI error:", error?.message || "unknown");
    return res.status(500).json({ error: "The intelligence core could not connect. Please try again." });
  }
}
