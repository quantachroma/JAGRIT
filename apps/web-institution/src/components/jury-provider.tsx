"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

interface JuryState {
  juryMode: boolean;
  toggleJury: () => void;
  setJury: (v: boolean) => void;
}

const JuryContext = createContext<JuryState>({
  juryMode: false,
  toggleJury: () => {},
  setJury: () => {},
});

export function JuryProvider({ children }: { children: React.ReactNode }) {
  const [juryMode, setJury] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("jagrit-jury-mode");
      if (saved === "1") setJury(true);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("jagrit-jury-mode", juryMode ? "1" : "0");
    } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("jury-mode", juryMode);
      document.body.classList.toggle("jury-mode", juryMode);
    }
  }, [juryMode]);

  const toggleJury = useCallback(() => setJury((v) => !v), []);
  const value = useMemo(() => ({ juryMode, toggleJury, setJury }), [juryMode, toggleJury]);
  return <JuryContext.Provider value={value}>{children}</JuryContext.Provider>;
}

export function useJury(): JuryState {
  return useContext(JuryContext);
}
