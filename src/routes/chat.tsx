import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Bot, Copy, Loader2, SendHorizontal, Trash2, User } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CHAT_SUGGESTIONS, generateChatReply } from "@/lib/demo-ai";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chatbot — AI Workplace Assistant" },
      {
        name: "description",
        content: "Chat with a simulated AI workplace assistant for emails, summaries, meetings and project planning.",
      },
      { property: "og:title", content: "AI Workplace Chat" },
      { property: "og:description", content: "Ask questions and get help with everyday workplace tasks." },
    ],
  }),
  component: ChatPage,
});

interface Msg {
  id: number;
  role: "user" | "assistant";
  text: string;
}

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  async function send(text: string) {
    const value = text.trim();
    if (!value || thinking) return;
    setInput("");
    setMessages((m) => [...m, { id: Date.now(), role: "user", text: value }]);
    setThinking(true);
    const reply = await generateChatReply(value);
    setMessages((m) => [...m, { id: Date.now() + 1, role: "assistant", text: reply }]);
    setThinking(false);
  }

  return (
    <AppShell title="AI Chatbot" description="Question → Workplace context → Answer → Next step">
      <Card className="flex h-[calc(100vh-15rem)] min-h-[520px] flex-col border-border bg-card">
        <CardContent className="flex min-h-0 flex-1 flex-col gap-4 p-4 sm:p-6">
          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto pr-1">
            {messages.length === 0 && !thinking && (
              <div className="grid h-full place-items-center text-center">
                <div className="max-w-sm">
                  <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-primary/15 text-accent">
                    <Bot className="size-6" />
                  </span>
                  <p className="mt-4 text-base font-semibold">How can I help with your work today?</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Pick a suggested prompt below or type your own question.
                  </p>
                </div>
              </div>
            )}

            {messages.map((m) => (
              <div key={m.id} className={cn("flex gap-3", m.role === "user" && "flex-row-reverse")}>
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-xl",
                    m.role === "user" ? "bg-secondary text-foreground" : "bg-primary/15 text-accent",
                  )}
                >
                  {m.role === "user" ? <User className="size-4" /> : <Bot className="size-4" />}
                </span>
                <div className={cn("max-w-[85%] space-y-1", m.role === "user" && "items-end text-right")}>
                  <div
                    className={cn(
                      "whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed",
                      m.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "border border-border bg-secondary/40 text-foreground",
                    )}
                  >
                    {m.text}
                  </div>
                  {m.role === "assistant" && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(m.text);
                        toast.success("Response copied");
                      }}
                      className="inline-flex items-center gap-1 text-[11px] text-muted-foreground transition-colors hover:text-accent"
                    >
                      <Copy className="size-3" /> Copy
                    </button>
                  )}
                </div>
              </div>
            ))}

            {thinking && (
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="grid size-8 place-items-center rounded-xl bg-primary/15 text-accent">
                  <Bot className="size-4" />
                </span>
                <span className="inline-flex items-center gap-2 rounded-2xl border border-border bg-secondary/40 px-4 py-3">
                  <Loader2 className="size-3.5 animate-spin" /> Thinking…
                </span>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="flex flex-wrap gap-2">
            {CHAT_SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                disabled={thinking}
                className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground transition-all hover:border-accent/60 hover:text-foreground disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-end gap-2">
            <Textarea
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder="Ask about emails, meetings, summaries, planning…"
              className="min-h-[52px] resize-none"
            />
            <Button size="icon" className="size-11 shrink-0" onClick={() => send(input)} disabled={thinking || !input.trim()} aria-label="Send message">
              <SendHorizontal className="size-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="size-11 shrink-0"
              onClick={() => setMessages([])}
              disabled={!messages.length}
              aria-label="Clear conversation"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}
