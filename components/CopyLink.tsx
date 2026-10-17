"use client";
import { useState } from "react";
export function CopyLink() {
  const [message, setMessage] = useState("Copy link");
  return (
    <button
      className="quiet"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(location.href);
          setMessage("Link copied");
        } catch {
          setMessage("Copy the address from your browser");
        }
      }}
    >
      {message}
    </button>
  );
}
