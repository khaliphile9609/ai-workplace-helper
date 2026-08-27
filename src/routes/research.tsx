import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, Loader2, RefreshCw, Search, Trash2, Lightbulb, ListChecks, Target, FileText } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateResearch, type ResearchFocus, type ResearchResult } from "@/lib/demo-ai";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — AI Workplace Assistant" },
      {
        name: "description",
        content: "Summarise any topic and get key insights, recommendations and practical action points you can edit.",
      },
      { property: "og:title", content: "AI Research Assistant" },
      { property: "og:description", content: "Turn topics and documents into summaries, insights and next steps." },
    ],
  }),
  component: ResearchPage,
});

type Editable = { summary: string; insights: string; recommendations: string; actions: string };

const toEditable = (r: ResearchResult): Editable => ({
  summary: r.summary,
  insights: r.insights.map((i) => `• ${i}`).join("\n"),
  recommendations: r.recommendations.map((i) => `• ${i}`).join("\n"),
  actions: r.actions.map((i, n) => `${n + 1}. ${i}`).join("\n"),
});

const SECTIONS = [
  { key: "summary", title: "Summary", icon: FileText, hint: "A concise explanation of the topic." },
  { key: "insights", title: "Key Insights", icon: Lightbulb, hint: "The points that matter most." },
  { key: "recommendations", title: "Recommendations", icon: Target, hint: "Suggestions based on the research." },
  { key: "actions", title: "Action Points", icon: ListChecks, hint: "Practical next steps." },
] as const;

function ResearchPage() {
  const [topic, setTopic] = useState("");
  const [context, setContext] = useState("");
  const [focus, setFocus] = useState<ResearchFocus>("overview");
  const [data, setData] = useState<Editable | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function run() {
    if (topic.trim().length < 3) {
      setError("Enter a topic or question with at least 3 characters.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      setData(toEditable(await generateResearch({ topic, context, focus })));
      toast.success("Analysis ready", { description: "Review the findings before sharing." });
    } finally {
      setLoading(false);
    }
  }

  async function copyAll() {
    if (!data) return;
    await navigator.clipboard.writeText(
      `SUMMARY\n${data.summary}\n\nKEY INSIGHTS\n${data.insights}\n\nRECOMMENDATIONS\n${data.recommendations}\n\nACTION POINTS\n${data.actions}`,
    );
    toast.success("Research copied to clipboard");
  }

  function clearAll() {
    setTopic("");
    setContext("");
    setData(null);
    setError("");
    toast("Cleared");
  }

  return (
    <AppShell title="AI Research Assistant" description="Topic → Context → Focus → Insights → Next steps">
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg">Research brief</CardTitle>
          <CardDescription>Add a topic, optionally paste source text, then choose a focus.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div className="space-y-2">
              <Label htmlFor="topic">Topic or question</Label>
              <Input
                id="topic"
                placeholder="e.g. How can our team use AI to reduce admin time?"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Research focus</Label>
              <Select value={focus} onValueChange={(v) => setFocus(v as ResearchFocus)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overview">General overview</SelectItem>
                  <SelectItem value="business-impact">Business impact</SelectItem>
                  <SelectItem value="risks">Risks & compliance</SelectItem>
                  <SelectItem value="implementation">Implementation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="context">Article or text (optional)</Label>
            <Textarea
              id="context"
              rows={5}
              placeholder="Paste an article, report extract or meeting notes to analyse…"
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />
          </div>

          {error && (
            <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
              {error}
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            <Button onClick={run} disabled={loading}>
              {loading ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />}
              {loading ? "Analysing…" : "Summarise & Analyse"}
            </Button>
            <Button variant="secondary" onClick={run} disabled={loading || !data}>
              <RefreshCw className="size-4" /> Regenerate
            </Button>
            <Button variant="secondary" onClick={copyAll} disabled={!data}>
              <Copy className="size-4" /> Copy
            </Button>
            <Button variant="ghost" onClick={clearAll}>
              <Trash2 className="size-4" /> Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {loading &&
          [...Array(4)].map((_, i) => (
            <Card key={i} className="border-border bg-card">
              <CardContent className="space-y-3 pt-6">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="h-4 animate-pulse rounded bg-secondary" style={{ width: `${92 - j * 9}%` }} />
                ))}
              </CardContent>
            </Card>
          ))}

        {!loading && !data && (
          <Card className="border-dashed border-border bg-card lg:col-span-2">
            <CardContent className="grid min-h-[220px] place-items-center text-center">
              <div>
                <Search className="mx-auto size-8 text-muted-foreground" />
                <p className="mt-3 text-sm font-medium">Nothing analysed yet</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Enter a topic above to generate a summary, insights, recommendations and action points.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {!loading &&
          data &&
          SECTIONS.map(({ key, title, icon: Icon, hint }) => (
            <Card key={key} className="border-border bg-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-xl bg-primary/15 text-accent">
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <CardTitle className="text-base">{title}</CardTitle>
                    <CardDescription className="text-xs">{hint}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={data[key]}
                  onChange={(e) => setData({ ...data, [key]: e.target.value })}
                  className="min-h-[190px] text-[13px] leading-relaxed"
                />
              </CardContent>
            </Card>
          ))}
      </div>
    </AppShell>
  );
}
