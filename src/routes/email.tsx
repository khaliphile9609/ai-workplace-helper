import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, Loader2, RefreshCw, Sparkles, Trash2, Mail } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateEmail, type Length, type Tone } from "@/lib/demo-ai";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — AI Workplace Assistant" },
      {
        name: "description",
        content: "Draft professional workplace emails in seconds with tone and length controls, then edit and copy.",
      },
      { property: "og:title", content: "Smart Email Generator" },
      { property: "og:description", content: "Generate polished workplace emails with tone and length controls." },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState<Tone>("formal");
  const [length, setLength] = useState<Length>("medium");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function run() {
    if (prompt.trim().length < 5) {
      setError("Please describe what the email should say (at least 5 characters).");
      return;
    }
    setError("");
    setLoading(true);
    try {
      setResult(await generateEmail({ recipient, subject, prompt, tone, length }));
      toast.success("Email drafted", { description: "Review and edit before sending." });
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    await navigator.clipboard.writeText(result);
    toast.success("Copied to clipboard");
  }

  function clearAll() {
    setRecipient("");
    setSubject("");
    setPrompt("");
    setResult("");
    setError("");
    toast("Cleared");
  }

  return (
    <AppShell title="Smart Email Generator" description="Purpose → Context → Tone → Length → Draft">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg">Email brief</CardTitle>
            <CardDescription>Tell the assistant who it's for and what it needs to achieve.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient / purpose</Label>
              <Input
                id="recipient"
                placeholder="e.g. Sarah, Head of Operations"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Email subject</Label>
              <Input
                id="subject"
                placeholder="e.g. Project timeline update"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prompt">What should the email say?</Label>
              <Textarea
                id="prompt"
                rows={5}
                placeholder="e.g. the revised delivery date for the onboarding portal and the approval we need by Friday"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Tone</Label>
                <Select value={tone} onValueChange={(v) => setTone(v as Tone)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="persuasive">Persuasive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Length</Label>
                <Select value={length} onValueChange={(v) => setLength(v as Length)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="detailed">Detailed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {error && (
              <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                {error}
              </p>
            )}

            <Button className="w-full" onClick={run} disabled={loading}>
              {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
              {loading ? "Generating…" : "Generate Email"}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex-row items-center justify-between gap-3 space-y-0">
            <div>
              <CardTitle className="text-lg">Draft</CardTitle>
              <CardDescription>Fully editable — refine before you send.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <div className="space-y-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-4 animate-pulse rounded bg-secondary" style={{ width: `${95 - i * 8}%` }} />
                ))}
              </div>
            ) : result ? (
              <Textarea
                value={result}
                onChange={(e) => setResult(e.target.value)}
                className="min-h-[420px] font-mono text-[13px] leading-relaxed"
              />
            ) : (
              <div className="grid min-h-[300px] place-items-center rounded-2xl border border-dashed border-border p-8 text-center">
                <div>
                  <Mail className="mx-auto size-8 text-muted-foreground" />
                  <p className="mt-3 text-sm font-medium">No draft yet</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Fill in the brief and select a tone to generate your email.
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" onClick={run} disabled={loading || !result}>
                <RefreshCw className="size-4" /> Regenerate
              </Button>
              <Button variant="secondary" onClick={copy} disabled={!result}>
                <Copy className="size-4" /> Copy
              </Button>
              <Button variant="ghost" onClick={clearAll}>
                <Trash2 className="size-4" /> Clear
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
