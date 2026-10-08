import { llmsTxt } from "@/app/lib/llms";

// Plain-Markdown site guide for AI assistants (https://llmstxt.org).
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsTxt(), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
