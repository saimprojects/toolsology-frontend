import React from "react";
import { Cog } from "lucide-react";

export default function GearLoader({ label = "", size = "md", className = "" }) {
  const sizes = { sm: "w-4 h-4", md: "w-6 h-6", lg: "w-12 h-12" };
  return (
    <span className={`inline-flex items-center justify-center gap-2 ${className}`} role="status" aria-live="polite">
      <Cog className={`${sizes[size] || sizes.md} animate-spin`} aria-hidden="true" />
      {label && <span>{label}</span>}
      <span className="sr-only">Please wait</span>
    </span>
  );
}
