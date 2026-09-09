import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * robots.txt
 *
 * AI crawlers are explicitly allowed rather than left to the default, because
 * being cited by ChatGPT, Perplexity, Claude and Google's AI surfaces requires
 * their crawlers to be able to fetch the pages at all. They are listed by name
 * so the intent is legible and a future decision to exclude one is a one-line
 * change rather than an archaeology exercise.
 *
 * Named agents (retrieval and training are separated where the operator
 * distinguishes them):
 *   GPTBot, OAI-SearchBot, ChatGPT-User      — OpenAI
 *   ClaudeBot, Claude-User, Claude-SearchBot — Anthropic
 *   PerplexityBot, Perplexity-User           — Perplexity
 *   Google-Extended                          — Gemini / AI Overviews grounding
 *   Applebot-Extended, Bingbot, DuckDuckBot, cohere-ai, meta-externalagent
 */
export default function robots(): MetadataRoute.Robots {
  const aiAgents = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-User",
    "Claude-SearchBot",
    "anthropic-ai",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Applebot-Extended",
    "Bingbot",
    "DuckDuckBot",
    "cohere-ai",
    "meta-externalagent",
    "Amazonbot",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: aiAgents,
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
