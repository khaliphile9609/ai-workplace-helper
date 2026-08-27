import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Mail,
  Search,
  MessagesSquare,
  Settings as SettingsIcon,
  ShieldCheck,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Bot,
} from "lucide-react";
import { useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { AI_DISCLAIMER } from "@/lib/demo-ai";
import { usePreferences } from "@/components/preferences";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email", label: "Smart Email Generator", icon: Mail },
  { to: "/research", label: "AI Research Assistant", icon: Search },
  { to: "/chat", label: "AI Chatbot", icon: MessagesSquare },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
] as const;

function NavList({ collapsed, onNavigate }: { collapsed?: boolean | undefined; onNavigate?: (() => void) | undefined }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="flex flex-col gap-1 px-3">
      {NAV.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            title={collapsed ? label : undefined}
            className={cn(
              "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
              active
                ? "bg-primary text-primary-foreground shadow-elev"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )}
          >
            <Icon className={cn("size-[18px] shrink-0", active ? "" : "group-hover:text-accent")} />
            {!collapsed && <span className="truncate">{label}</span>}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarInner({
  collapsed,
  onNavigate,
}: {
  collapsed?: boolean | undefined;
  onNavigate?: (() => void) | undefined;
}) {
  return (
    <div className="flex h-full flex-col gap-6 py-5">
      <Link
        to="/"
        onClick={onNavigate}
        className={cn("flex items-center gap-3 px-5", collapsed && "px-4 justify-center")}
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-glow">
          <Bot className="size-5" />
        </span>
        {!collapsed && (
          <span className="leading-tight">
            <span className="block text-sm font-bold">AI Workplace</span>
            <span className="block text-xs text-muted-foreground">Productivity Assistant</span>
          </span>
        )}
      </Link>

      <NavList collapsed={collapsed} onNavigate={onNavigate} />

      <div className="mt-auto px-3">
        <div
          className={cn(
            "rounded-xl border border-sidebar-border bg-sidebar-accent/50 p-3",
            collapsed && "flex justify-center p-2",
          )}
        >
          <div className="flex items-start gap-2">
            <ShieldCheck className="size-4 shrink-0 text-success" />
            {!collapsed && (
              <div className="text-[11px] leading-snug text-muted-foreground">
                <span className="block font-semibold text-foreground">Responsible AI</span>
                Always review AI output before use.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AppShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { prefs } = usePreferences();

  return (
    <div className="flex min-h-screen bg-background">
      <aside
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 border-r border-sidebar-border bg-sidebar transition-[width] duration-300 lg:block",
          collapsed ? "w-[76px]" : "w-[272px]",
        )}
      >
        <SidebarInner collapsed={collapsed} />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background/80 px-4 py-3 backdrop-blur-xl sm:px-6">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] border-sidebar-border bg-sidebar p-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <SidebarInner onNavigate={() => setMobileOpen(false)} />
            </SheetContent>
          </Sheet>

          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:inline-flex"
            aria-label="Toggle sidebar"
            onClick={() => setCollapsed((c) => !c)}
          >
            {collapsed ? <PanelLeftOpen className="size-5" /> : <PanelLeftClose className="size-5" />}
          </Button>

          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold sm:text-lg">{title}</h1>
            <p className="hidden truncate text-xs text-muted-foreground sm:block">{description}</p>
          </div>

          <span className="ml-auto hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground md:inline-flex">
            <span className="size-2 rounded-full bg-success" />
            Demo mode · simulated AI
          </span>
        </header>

        <main
          className={cn(
            "mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6",
            prefs.density === "compact" ? "py-5" : "py-8",
          )}
        >
          {children}
        </main>

        {prefs.showDisclaimer && (
          <footer className="border-t border-border bg-card/40 px-4 py-4 sm:px-6">
            <p className="mx-auto max-w-6xl text-[11px] leading-relaxed text-muted-foreground">
              <ShieldCheck className="mr-1.5 inline size-3.5 text-warning" />
              {AI_DISCLAIMER}
            </p>
          </footer>
        )}
      </div>
    </div>
  );
}
