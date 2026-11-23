import { createFileRoute } from "@tanstack/react-router";
import { TelegramMark, XMark } from "@/components/icons";
import { btnGhost, btnInk } from "@/lib/utils";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Moeez AI Vault" },
      {
        name: "description",
        content: "Moeez AI Vault is a free directory of uncensored open-source models you can run locally.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-12">
      <p className="text-sm font-medium text-primary">About</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Built by Moeez</h1>
      <div className="mt-6 flex flex-col gap-4 text-base leading-7 text-muted">
        <p>
          Moeez is an AI creator who shares free models and tools. Moeez AI Vault is the public
          list: uncensored and abliterated open-source models, sorted by the memory you have, with
          one command you can paste into a terminal.
        </p>
        <p>
          Hosted chats hide the weights, meter the replies, and refuse topics on someone else's
          policy. A local model does none of that. It runs on your computer, offline after the
          download, under the licence on the model card.
        </p>
        <p>
          This site exists so you do not have to hunt Hugging Face for a build that fits an 8GB
          laptop. The catalog is a single file,{" "}
          <span className="font-mono text-sm text-fg">src/data/models.json</span>. Replace it when
          the list grows. There is no account and no database.
        </p>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a href="https://x.com/Moeez_o" target="_blank" rel="noreferrer" className={btnInk}>
          <XMark className="size-4" />
          Follow @Moeez_o on X
        </a>
        <a href="https://t.me/MoeezAi" target="_blank" rel="noreferrer" className={btnGhost}>
          <TelegramMark className="size-4" />
          Telegram
        </a>
      </div>
    </main>
  );
}
