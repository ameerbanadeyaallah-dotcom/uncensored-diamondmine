import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import {
  formatDownloads,
  formatGB,
  formatUpdated,
  type Model,
} from "@/lib/models";

export function ModelDialog({
  model,
  onClose,
}: {
  model: Model | null;
  onClose: () => void;
}) {
  return (
    <Dialog.Root open={model !== null} onOpenChange={(open) => { if (!open) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay fixed inset-0 z-50 bg-ink/80" />
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
          {model ? (
            <Dialog.Content className="dialog-panel pointer-events-auto w-full max-w-lg overflow-y-auto rounded-2xl border border-line bg-surface p-5 shadow-none">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-primary">{model.category}</p>
                  <Dialog.Title className="mt-2 text-xl font-semibold tracking-tight text-fg">
                    {model.name}
                  </Dialog.Title>
                  <Dialog.Description className="mt-1 text-sm text-muted">
                    {model.baseModel}
                    {model.params ? ` · ${model.params}` : ""}
                  </Dialog.Description>
                </div>
                <Dialog.Close
                  className="press inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-line text-muted hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Close"
                >
                  <X className="size-4" />
                </Dialog.Close>
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-3">
                <Fact label="File size" value={formatGB(model.sizeGB)} />
                <Fact label="RAM needed" value={formatGB(model.ramGB)} />
                <Fact label="Licence" value={model.licence} />
                <Fact label="Downloads" value={formatDownloads(model.downloads)} />
                <Fact label="Updated" value={formatUpdated(model.updated)} />
                <Fact label="Repo" value={model.repo} />
              </dl>

              <div className="mt-5">
                <CodeBlock code={model.command} label="Run command" />
              </div>

              <a
                href={model.hfUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex text-sm font-medium text-primary hover:underline"
              >
                View on Hugging Face
              </a>
            </Dialog.Content>
          ) : null}
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line bg-bg px-3 py-3">
      <dt className="text-xs text-subtle">{label}</dt>
      <dd className="mt-1 break-words text-sm font-medium text-fg">{value}</dd>
    </div>
  );
}
