import { TelegramMark, XMark } from "@/components/icons";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">Built by Moeez</p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <a
            href="https://x.com/Moeez_o"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-muted hover:text-fg"
          >
            <XMark className="size-3.5" />X
          </a>
          <a
            href="https://t.me/MoeezAi"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-muted hover:text-fg"
          >
            <TelegramMark className="size-3.5" />
            Telegram
          </a>
          <p className="text-subtle">Last checked: Nov 23, 2026</p>
        </div>
      </div>
    </footer>
  );
}
