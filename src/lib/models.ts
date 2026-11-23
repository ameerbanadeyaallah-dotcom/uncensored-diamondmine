import data from "@/data/models.json";

export const CATEGORIES = ["Chat", "Coding", "Reasoning", "Vision", "Writing"] as const;

export type Category = (typeof CATEGORIES)[number];

export type Model = {
  name: string;
  repo: string;
  baseModel: string;
  params: string | null;
  sizeGB: number;
  ramGB: number;
  category: Category;
  licence: string;
  downloads: number;
  updated: string;
  command: string;
  hfUrl: string;
};

export const MEMORY_FILTERS = [
  { id: "4", label: "4GB", match: (model: Model) => model.ramGB <= 4 },
  { id: "8", label: "8GB", match: (model: Model) => model.ramGB <= 8 },
  { id: "16", label: "16GB", match: (model: Model) => model.ramGB <= 16 },
  { id: "24", label: "24GB", match: (model: Model) => model.ramGB <= 24 },
  { id: "48", label: "48GB+", match: (model: Model) => model.ramGB >= 48 },
] as const;

export type MemoryId = (typeof MEMORY_FILTERS)[number]["id"];
export type SortId = "downloads" | "smallest" | "newest";

function isCategory(value: unknown): value is Category {
  return typeof value === "string" && (CATEGORIES as readonly string[]).includes(value);
}

function isModel(value: unknown): value is Model {
  if (!value || typeof value !== "object") return false;
  const model = value as Record<string, unknown>;
  return (
    typeof model.name === "string" &&
    typeof model.repo === "string" &&
    typeof model.baseModel === "string" &&
    (typeof model.params === "string" || model.params === null) &&
    typeof model.sizeGB === "number" &&
    typeof model.ramGB === "number" &&
    isCategory(model.category) &&
    typeof model.licence === "string" &&
    typeof model.downloads === "number" &&
    typeof model.updated === "string" &&
    typeof model.command === "string" &&
    typeof model.hfUrl === "string"
  );
}

export const models: Model[] = (data as unknown[]).filter(isModel);

export const featuredModels = [...models].sort((a, b) => b.downloads - a.downloads).slice(0, 6);

export function catalogStats(list: Model[]) {
  const smallest = list.length === 0 ? 0 : Math.min(...list.map((model) => model.sizeGB));
  return {
    total: list.length,
    smallest,
    categories: new Set(list.map((model) => model.category)).size,
  };
}

export function filterModels(
  list: Model[],
  opts: { query: string; memory: MemoryId | null; category: Category | null; sort: SortId },
) {
  const query = opts.query.trim().toLowerCase();
  const memory = MEMORY_FILTERS.find((item) => item.id === opts.memory);

  const next = list.filter((model) => {
    if (memory && !memory.match(model)) return false;
    if (opts.category && model.category !== opts.category) return false;
    if (!query) return true;
    const haystack = [model.name, model.repo, model.baseModel, model.category, model.licence]
      .join(" ")
      .toLowerCase();
    return haystack.includes(query);
  });

  next.sort((a, b) => {
    if (opts.sort === "smallest") return a.sizeGB - b.sizeGB || a.name.localeCompare(b.name);
    if (opts.sort === "newest") return b.updated.localeCompare(a.updated) || a.name.localeCompare(b.name);
    return b.downloads - a.downloads || a.name.localeCompare(b.name);
  });

  return next;
}

export function formatGB(value: number) {
  const digits = Number.isInteger(value) ? 0 : 1;
  return `${value.toFixed(digits)} GB`;
}

export function formatDownloads(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatUpdated(iso: string) {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
