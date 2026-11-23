import { Shield } from "lucide-react";

export function SafetyNote() {
  return (
    <p className="flex gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-sm leading-6 text-muted">
      <Shield className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
      <span>
        These are community uploads. Read each model card, use responsibly, and follow your local
        laws.
      </span>
    </p>
  );
}
