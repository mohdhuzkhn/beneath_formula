"use client";
import { useEffect } from "react";
export function ThemeControls() {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        window.location.href = "/search";
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <button
      className="quiet"
      aria-label="Toggle color theme"
      onClick={() => {
        const theme =
          document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = theme;
        try {
          localStorage.setItem("theme", theme);
        } catch {
          /* Storage may be disabled; theme still applies for this visit. */
        }
      }}
    >
      <span aria-hidden="true">◐</span>
      <span>Theme</span>
    </button>
  );
}
