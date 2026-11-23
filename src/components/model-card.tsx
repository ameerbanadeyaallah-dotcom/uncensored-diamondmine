import { Copy } from "lucide-react";
import { copyText } from "@/lib/copy";
import { formatDownloads, formatGB, type Model } from "@/lib/models";
import { btnGhost, btnPrimary } from "@/lib/utils";

export function ModelCard({ model, onOpen }: { model: Model; onOpen: (model: Model) => void }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-4 transition-colors duration-150 hover:border-primary/50">
      <button
        type="button"
        onClick={() => onOpen(model)}
        className="flex flex-1 flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full border border-line px-2.5 py-1 text-xs font-medium text-muted">
            {model.category}
          </span>
          <span className="font-mono text-xs text-subtle">{model.params ?? "—"}</span>
        </div>
        <h3 className="mt-4 text-lg font-semibold tracking-tight text-fg">{model.name}</h3>
        <p className="mt-1 text-sm text-muted">{model.baseModel}</p>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-xs text-subtle">Size</dt>
            <dd className="mt-1 font-medium tabular-nums text-fg">{formatGB(model.sizeGB)}</dd>
          </div>
          <div>
            <dt className="text-xs text-subtle">RAM</dt>
            <dd className="mt-1 font-medium tabular-nums text-fg">{formatGB(model.ramGB)}</dd>
          </div>
          <div>
            <dt className="text-xs text-subtle">Licence</dt>
            <dd className="mt-1 font-medium text-fg">{model.licence}</dd>
          </div>
          <div>
            <dt className="text-xs text-subtle">Downloads</dt>
            <dd className="mt-1 font-medium tabular-nums text-fg">
              {formatDownloads(model.downloads)}
            </dd>
          </div>
        </dl>
      </button>
      <div className="mt-5 flex flex-col gap-2">
        <button
          type="button"
          className={btnPrimary}
          onClick={() => {
            void copyText(model.command);
          }}
        >
          <Copy className="size-4" />
          Copy run command
        </button>
        <a href={model.hfUrl} target="_blank" rel="noreferrer" className={btnGhost}>
          View on Hugging Face
        </a>
      </div>
    </article>
  );
}
