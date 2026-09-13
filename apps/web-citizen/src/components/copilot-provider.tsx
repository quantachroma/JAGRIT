"use client";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

interface CopilotState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const CopilotContext = createContext<CopilotState>({
  isOpen: false,
  open: () => {},
  close: () => {},
  toggle: () => {},
});

export function CopilotProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);
  const value = useMemo(() => ({ isOpen, open, close, toggle }), [isOpen, open, close, toggle]);
  return <CopilotContext.Provider value={value}>{children}</CopilotContext.Provider>;
}

export function useCopilot(): CopilotState {
  return useContext(CopilotContext);
}
