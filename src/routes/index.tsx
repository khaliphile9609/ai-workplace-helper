import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Search, MessagesSquare, PenLine, FileText, Sparkle, Wand2, ArrowRight } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Workplace Productivity Assistant — Dashboard" },
      {
        name: "description",
        content:
          "Generate professional emails, research topics and chat with an AI workplace assistant from one clean productivity dashboard.",
      },
      { property: "og:title", content: "AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content: "A modern AI dashboard for workplace emails, research summaries and everyday assistance.",
      },
    ],
  }),
  component: Dashboard,
});

const FEATURES = [
  {
    to: "/email" as const,
    icon: Mail,
    title: "Smart Email Generator",
    description: "Generate professional workplace emails in seconds.",
    cta: "Generate Email",
  },
  {
    to: "/research" as const,
    icon: Search,
    title: "AI Research Assistant",
    description: "Summarise topics, extract key insights, and generate recommendations.",
    cta: "Start Research",
  },
  {
    to: "/chat" as const,
    icon: MessagesSquare,
    title: "AI Workplace Chat",
    description: "Ask questions and get assistance with everyday workplace tasks.",
    cta: "Open AI Chat",
  },
];

const QUICK_ACTIONS = [
  { to: "/email" as const, icon: PenLine, label: "Write an Email" },
  { to: "/research" as const, icon: FileText, label: "Summarise a Topic" },
  { to: "/chat" as const, icon: Sparkle, label: "Ask AI" },
  { to: "/chat" as const, icon: Wand2, label: "Improve Text" },
];

function Dashboard() {
  return (
    <AppShell title="Dashboard" description="Your AI workplace command centre">
      <section className="rounded-3xl border border-border surface-grad p-6 shadow-elev sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Workspace</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Good morning 👋</h2>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
          Your AI workplace assistant is ready to help.
        </p>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {FEATURES.map(({ to, icon: Icon, title, description, cta }) => (
          <Card
            key={title}
            className="group border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-glow"
          >
            <CardHeader>
              <span className="grid size-11 place-items-center rounded-2xl bg-primary/15 text-accent transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-5" />
              </span>
              <CardTitle className="mt-4 text-lg">{title}</CardTitle>
              <CardDescription className="leading-relaxed">{description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link to={to}>
                  {cta}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-8">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Quick actions</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_ACTIONS.map(({ to, icon: Icon, label }) => (
            <Link
              key={label}
              to={to}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm font-medium transition-all duration-200 hover:border-accent/60 hover:bg-secondary"
            >
              <Icon className="size-4 text-accent" />
              {label}
            </Link>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
