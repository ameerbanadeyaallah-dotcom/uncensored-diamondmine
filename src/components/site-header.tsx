import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { XMark } from "@/components/icons";
import { btnInk, cn } from "@/lib/utils";

const LINKS = [
  { to: "/", label: "Home", exact: true },
  { to: "/models", label: "Models", exact: false },
  { to: "/how-to-use", label: "How to Use", exact: false },
  { to: "/about", label: "About", exact: false },
] as const;

function FollowLink({ className }: { className?: string }) {
  return (
    <a
      href="https://x.com/Moeez_o"
      target="_blank"
      rel="noreferrer"
      className={cn(btnInk, className)}
    >
      <XMark className="size-4" />
      Follow @Moeez_o on X
    </a>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-sage text-base font-semibold text-primary-fg">
            M
          </span>
          <span className="flex flex-col items-start">
            <span className="text-base font-semibold tracking-tight text-fg">Moeez</span>
            <span className="mt-1 inline-flex rounded-full border border-line bg-sand px-2 py-0.5 text-xs text-fg">
              Built by Moeez
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {LINKS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.exact }}
              className="rounded-lg px-3 py-2 text-sm font-medium"
              activeProps={{ className: "rounded-lg px-3 py-2 text-sm font-medium text-fg" }}
              inactiveProps={{
                className: "rounded-lg px-3 py-2 text-sm font-medium text-muted hover:text-fg",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <FollowLink className="hidden lg:inline-flex" />
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-lg border border-line text-fg md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-line px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {LINKS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.exact }}
                onClick={() => setOpen(false)}
                className="flex h-11 items-center rounded-lg px-3 text-sm font-medium"
                activeProps={{
                  className: "flex h-11 items-center rounded-lg px-3 text-sm font-medium text-fg",
                }}
                inactiveProps={{
                  className:
                    "flex h-11 items-center rounded-lg px-3 text-sm font-medium text-muted",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <FollowLink className="mt-3 w-full" />
        </div>
      ) : null}
    </header>
  );
}
