import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { copyText } from "@/lib/copy";

export function CodeBlock({ code, label }: { code: string; label?: string }) {
  const [done, setDone] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2">
        <p className="text-xs font-medium text-subtle">{label ?? "Command"}</p>
        <button
          type="button"
          className="press inline-flex h-9 items-center gap-2 rounded-lg px-2 text-xs font-medium text-muted hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          onClick={() => {
            void copyText(code).then(() => {
              setDone(true);
              window.setTimeout(() => setDone(false), 1600);
            });
          }}
        >
          {done ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {done ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-6 text-fg">
        <code>{code}</code>
      </pre>
    </div>
  );
}
