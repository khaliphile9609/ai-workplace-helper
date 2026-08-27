import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface Preferences {
  theme: "navy" | "light";
  density: "comfortable" | "compact";
  showDisclaimer: boolean;
  animations: boolean;
}

const DEFAULTS: Preferences = {
  theme: "navy",
  density: "comfortable",
  showDisclaimer: true,
  animations: true,
};

const KEY = "awpa-preferences";

const PreferencesContext = createContext<{
  prefs: Preferences;
  setPref: <K extends keyof Preferences>(key: K, value: Preferences[K]) => void;
  reset: () => void;
}>({ prefs: DEFAULTS, setPref: () => {}, reset: () => {} });

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<Preferences>(DEFAULTS);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setPrefs({ ...DEFAULTS, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("theme-light", prefs.theme === "light");
    root.classList.toggle("no-motion", !prefs.animations);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(prefs));
    } catch {
      /* ignore */
    }
  }, [prefs]);

  const setPref = <K extends keyof Preferences>(key: K, value: Preferences[K]) =>
    setPrefs((p) => ({ ...p, [key]: value }));

  return (
    <PreferencesContext.Provider value={{ prefs, setPref, reset: () => setPrefs(DEFAULTS) }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export const usePreferences = () => useContext(PreferencesContext);
