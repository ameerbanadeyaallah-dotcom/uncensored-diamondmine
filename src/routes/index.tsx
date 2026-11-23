import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { XMark } from "@/components/icons";
import { ModelCard } from "@/components/model-card";
import { ModelDialog } from "@/components/model-dialog";
import { catalogStats, featuredModels, formatGB, models, type Model } from "@/lib/models";
import { btnGhost, btnInk, btnPrimary } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Moeez AI Vault" },
      {
        name: "description",
        content:
          "100+ uncensored AI models. Free. Run on your own computer. Sorted by the memory you have.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [selected, setSelected] = useState<Model | null>(null);
  const stats = catalogStats(models);

  return (
    <main>
      <section className="mx-auto grid w-full max-w-6xl items-stretch gap-8 px-5 pb-6 pt-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:pt-20">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium text-primary">Moeez AI Vault</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-fg sm:text-6xl sm:leading-tight">
            100+ uncensored AI models. Free. Run on your own computer.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted">
            Sorted by the memory you have. One copy-paste command each.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/models" className={btnPrimary}>
              Browse models
            </Link>
            <Link to="/how-to-use" className={btnGhost}>
              How to use
            </Link>
          </div>
        </div>

        <aside className="flex min-h-96 flex-col overflow-hidden rounded-2xl border border-line" aria-label="Vault summary">
          <div className="flex flex-1 flex-col justify-end bg-sage px-6 py-8 text-primary-fg">
            <p className="text-sm font-medium">In the directory</p>
            <p className="mt-3 text-5xl font-semibold tabular-nums tracking-tight">{stats.total}</p>
            <p className="mt-1 text-base">models you can run locally</p>
          </div>
          <div className="bg-tan px-6 py-5 text-fg">
            <p className="text-xs font-medium tracking-wide text-fg/80">Smallest file</p>
            <p className="mt-1 text-3xl font-semibold tabular-nums tracking-tight">
              {formatGB(stats.smallest)}
            </p>
          </div>
          <div className="bg-sand px-6 py-5 text-fg">
            <p className="text-xs font-medium tracking-wide">Categories</p>
            <p className="mt-1 text-3xl font-semibold tabular-nums tracking-tight">{stats.categories}</p>
            <p className="mt-1 text-sm">Chat, coding, reasoning, vision</p>
          </div>
          <div className="bg-surface px-6 py-5">
            <p className="text-sm font-medium text-fg">One command each</p>
            <p className="mt-1 text-sm text-muted">Copy it, paste it in a terminal, start chatting.</p>
          </div>
        </aside>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-10">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">Featured models</h2>
          <Link to="/models" className="text-sm font-medium text-primary">
            View all
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredModels.map((model) => (
            <ModelCard key={model.repo} model={model} onOpen={setSelected} />
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-4 px-5 py-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)]">
        <div className="rounded-2xl bg-sage px-6 py-10 text-primary-fg sm:px-10">
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight">
            New models land on X first.
          </h2>
          <p className="mt-3 max-w-lg text-primary-fg/90">
            Follow @Moeez_o for run notes, fresh abliterations, and tools you can use for free.
          </p>
          <a
            href="https://x.com/Moeez_o"
            target="_blank"
            rel="noreferrer"
            className="press mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-surface px-4 text-sm font-medium text-fg hover:bg-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface focus-visible:ring-offset-2 focus-visible:ring-offset-sage"
          >
            <XMark className="size-4" />
            Follow @Moeez_o on X
          </a>
        </div>
        <div className="flex flex-col justify-between rounded-2xl bg-tan px-6 py-8 text-fg">
          <div>
            <p className="text-sm font-medium">Telegram</p>
            <p className="mt-2 text-lg font-semibold tracking-tight">Notes and new builds, same list.</p>
          </div>
          <a
            href="https://t.me/MoeezAi"
            target="_blank"
            rel="noreferrer"
            className={`${btnInk} mt-6 w-fit`}
          >
            Open Telegram
          </a>
        </div>
      </section>

      <ModelDialog model={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
