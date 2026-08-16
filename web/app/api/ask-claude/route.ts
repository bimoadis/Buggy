import { NextRequest } from "next/server";

/* OpenRouter model — Ministral 3B (low-latency, cheap) */
const MODEL = "mistralai/ministral-3b-2512";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { question?: string; context?: string };
    const question = body.question?.trim();
    const context  = body.context?.trim() ?? "";

    if (!question) {
      return Response.json({ error: "Question is required" }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error("[ask-buggy] OPENROUTER_API_KEY is not set. Restart the dev server after adding web/.env.local");
      return Response.json(
        { error: "API key not configured — restart the dev server after adding OPENROUTER_API_KEY to web/.env.local" },
        { status: 500 }
      );
    }

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer":  "https://buggy.vercel.app",
        "X-Title":       "buggy — Bug Hunting Skills & Security Toolkit",
      },
      body: JSON.stringify({
        model:      MODEL,
        max_tokens: 480,
        messages: [
          {
            role: "system",
            content:
              `You are buggy — a concise expert assistant for bug bounty and security research. ` +
              `Answer clearly in under 200 words. Use markdown for code and tables. ` +
              `Skip pleasantries. If off-topic, redirect politely to security research. ` +
              `Skill context: ${context}`,
          },
          { role: "user", content: question },
        ],
      }),
    });

    const rawText = await res.text();

    if (!res.ok) {
      console.error(`[ask-buggy] OpenRouter ${res.status}:`, rawText);
      return Response.json(
        { error: `OpenRouter responded with ${res.status}: ${rawText.slice(0, 300)}` },
        { status: 502 }
      );
    }

    let data: { choices?: { message?: { content?: string } }[] };
    try {
      data = JSON.parse(rawText);
    } catch {
      console.error("[ask-buggy] Failed to parse OpenRouter response:", rawText);
      return Response.json({ error: "Malformed response from OpenRouter." }, { status: 502 });
    }

    const answer = data.choices?.[0]?.message?.content?.trim() ?? "No response.";
    return Response.json({ answer });

  } catch (err) {
    console.error("[ask-buggy] Unhandled error:", err);
    return Response.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
