import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Palette, SlidersHorizontal, Info } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePreferences, type Preferences } from "@/components/preferences";
import { AI_DISCLAIMER } from "@/lib/demo-ai";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — AI Workplace Assistant" },
      {
        name: "description",
        content: "Adjust display and interface preferences, and read the responsible AI guidance for this demo app.",
      },
      { property: "og:title", content: "Settings — AI Workplace Assistant" },
      { property: "og:description", content: "Display preferences, interface options and responsible AI guidance." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { prefs, setPref, reset } = usePreferences();

  return (
    <AppShell title="Settings" description="Display, interface and responsible AI information">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border bg-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-primary/15 text-accent">
                <Palette className="size-4" />
              </span>
              <div>
                <CardTitle className="text-base">Theme & display</CardTitle>
                <CardDescription className="text-xs">Choose how the workspace looks.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label>Colour theme</Label>
              <Select
                value={prefs.theme}
                onValueChange={(v) => setPref("theme", v as Preferences["theme"])}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="navy">Navy (default)</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Layout density</Label>
              <Select
                value={prefs.density}
                onValueChange={(v) => setPref("density", v as Preferences["density"])}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="comfortable">Comfortable</SelectItem>
                  <SelectItem value="compact">Compact</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-primary/15 text-accent">
                <SlidersHorizontal className="size-4" />
              </span>
              <div>
                <CardTitle className="text-base">Interface preferences</CardTitle>
                <CardDescription className="text-xs">Small tweaks to how the app behaves.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <Label htmlFor="disclaimer">Show AI disclaimer footer</Label>
                <p className="text-xs text-muted-foreground">Keeps the responsible AI notice visible on every page.</p>
              </div>
              <Switch
                id="disclaimer"
                checked={prefs.showDisclaimer}
                onCheckedChange={(v) => setPref("showDisclaimer", v)}
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <Label htmlFor="animations">Smooth animations</Label>
                <p className="text-xs text-muted-foreground">Enable hover and transition effects.</p>
              </div>
              <Switch
                id="animations"
                checked={prefs.animations}
                onCheckedChange={(v) => setPref("animations", v)}
              />
            </div>
            <Button
              variant="secondary"
              onClick={() => {
                reset();
                toast.success("Preferences reset to defaults");
              }}
            >
              Reset preferences
            </Button>
          </CardContent>
        </Card>

        <Card className="border-warning/40 bg-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-warning/15 text-warning">
                <ShieldCheck className="size-4" />
              </span>
              <div>
                <CardTitle className="text-base">Responsible AI</CardTitle>
                <CardDescription className="text-xs">Your responsibility as the user.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>{AI_DISCLAIMER}</p>
            <p>
              You remain responsible for reviewing, fact-checking and editing anything produced here before it is sent,
              published or used to support a decision. Avoid entering confidential or personal data, and confirm any
              figures, names or claims against a trusted source.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-primary/15 text-accent">
                <Info className="size-4" />
              </span>
              <div>
                <CardTitle className="text-base">About this application</CardTitle>
                <CardDescription className="text-xs">Version 1.0 · Demo build</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              AI Workplace Productivity Assistant is a frontend-only prototype that demonstrates three workplace tools:
              a smart email generator, a research assistant and a conversational assistant.
            </p>
            <p>
              All responses are realistic simulations generated in your browser. There is no account, no database and
              no external service — nothing you type leaves your device.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
