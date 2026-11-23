import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { ModelCard } from "@/components/model-card";
import { ModelDialog } from "@/components/model-dialog";
import { SafetyNote } from "@/components/safety-note";
import {
  CATEGORIES,
  filterModels,
  MEMORY_FILTERS,
  models,
  type Category,
  type MemoryId,
  type Model,
  type SortId,
} from "@/lib/models";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/models")({
  head: () => ({
    meta: [
      { title: "Models — Moeez AI Vault" },
      {
        name: "description",
        content: "Search uncensored local models by memory, category, and size. Copy one run command.",
      },
    ],
  }),
  component: ModelsPage,
});

function ModelsPage() {
  const [query, setQuery] = useState("");
  const [memory, setMemory] = useState<MemoryId | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [sort, setSort] = useState<SortId>("downloads");
  const [selected, setSelected] = useState<Model | null>(null);

  const visible = useMemo(
    () => filterModels(models, { query, memory, category, sort }),
    [query, memory, category, sort],
  );

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-12">
      <p className="text-sm font-medium text-primary">Directory</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Models</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Sorted by the memory you have. One copy-paste command each. The catalog lives in{" "}
        <span className="font-mono text-sm text-fg">src/data/models.json</span> — replace that file
        to publish your full catalog.
      </p>

      <div className="mt-6">
        <SafetyNote />
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <label className="relative block">
          <span className="sr-only">Search models</span>
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle"
            aria-hidden="true"
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, base model, or repo"
            className="h-11 w-full rounded-lg border border-line bg-surface pr-3 pl-10 text-sm text-fg placeholder:text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </label>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Memory">
            {MEMORY_FILTERS.map((item) => {
              const active = memory === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setMemory(active ? null : item.id)}
                  className={cn(
                    "h-11 rounded-full border px-4 text-sm font-medium transition-colors duration-150",
                    active
                      ? "border-primary bg-primary text-primary-fg"
                      : "border-line bg-surface text-muted hover:text-fg",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <label className="flex items-center gap-3 text-sm text-muted">
            Sort
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortId)}
              className="h-11 rounded-lg border border-line bg-surface px-3 text-sm text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <option value="downloads">Most downloaded</option>
              <option value="smallest">Smallest</option>
              <option value="newest">Newest</option>
            </select>
          </label>
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Category">
          {CATEGORIES.map((item) => {
            const active = category === item;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(active ? null : item)}
                className={cn(
                  "h-11 rounded-full border px-4 text-sm font-medium transition-colors duration-150",
                  active
                    ? "border-primary bg-primary text-primary-fg"
                    : "border-line bg-surface text-muted hover:text-fg",
                )}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-6 text-sm text-subtle">
        {visible.length} {visible.length === 1 ? "model" : "models"}
        {memory ? ` · fits ${MEMORY_FILTERS.find((item) => item.id === memory)?.label}` : ""}
      </p>

      {visible.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-line bg-surface px-6 py-12 text-center">
          <p className="text-lg font-medium">No models match</p>
          <p className="mt-2 text-sm text-muted">Clear a filter or try another search.</p>
          <button
            type="button"
            className="mt-5 text-sm font-medium text-primary"
            onClick={() => {
              setQuery("");
              setMemory(null);
              setCategory(null);
            }}
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((model) => (
            <ModelCard key={model.repo} model={model} onOpen={setSelected} />
          ))}
        </div>
      )}

      <ModelDialog model={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
