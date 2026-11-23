import type { ReactNode } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import { SafetyNote } from "@/components/safety-note";
import { models } from "@/lib/models";

const EXAMPLE = models[0]?.command ?? "ollama run hf.co/user/repo:Q4_K_M";

const FAQS = [
  {
    q: "Is it free?",
    a: "Yes. The models in this directory are free to download and run on your own computer. You pay nothing to Moeez. Your limit is the memory and disk on the machine in front of you.",
  },
  {
    q: "Is it safe?",
    a: "These are community uploads, not files reviewed by Moeez. Open the model card, check the repo, and only run weights you trust. Do not paste passwords, private keys, or other people's data into a local chat. Follow the laws where you live.",
  },
  {
    q: "What does uncensored mean?",
    a: "Uncensored and abliterated builds have some refusal training removed or reduced, so they answer topics a stock model might decline. That does not make every use legal or wise. You are responsible for what you generate.",
  },
];

export const Route = createFileRoute("/how-to-use")({
  head: () => ({
    meta: [
      { title: "How to Use — Moeez AI Vault" },
      {
        name: "description",
        content: "Check your memory, install Ollama or LM Studio, and run a local model with one command.",
      },
    ],
  }),
  component: HowToPage,
});

function HowToPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-12">
      <p className="text-sm font-medium text-primary">Guide</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">How to use</h1>
      <p className="mt-3 text-muted">
        Four steps from a cold computer to a local chat. No account. No API key.
      </p>
      <div className="mt-6">
        <SafetyNote />
      </div>

      <ol className="mt-10 flex flex-col gap-10">
        <Step n="01" title="Check your RAM and VRAM">
          <p>
            Pick a model that fits the memory you actually have. System RAM matters for CPU runs.
            VRAM matters if a GPU will hold the weights.
          </p>
          <CodeBlock
            label="Windows"
            code={`systeminfo | findstr /C:"Total Physical Memory"\n\nREM NVIDIA VRAM, if you have an NVIDIA GPU\nnvidia-smi`}
          />
          <CodeBlock
            label="Mac"
            code={`sysctl -n hw.memsize\n\n# Apple silicon shares GPU memory with RAM.\n# Intel Macs:\nsystem_profiler SPDisplaysDataType`}
          />
          <CodeBlock
            label="Linux"
            code={`free -h\n\n# NVIDIA VRAM\nnvidia-smi`}
          />
        </Step>

        <Step n="02" title="Install Ollama or LM Studio">
          <p>
            Ollama is a terminal app. LM Studio is a desktop app if you would rather not use a
            command line. Install one.
          </p>
          <p>
            <a
              href="https://ollama.com/download"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary hover:underline"
            >
              Download Ollama
            </a>
            <span className="text-subtle"> · </span>
            <a
              href="https://lmstudio.ai"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary hover:underline"
            >
              Download LM Studio
            </a>
          </p>
          <CodeBlock
            label="macOS and Linux"
            code="curl -fsSL https://ollama.com/install.sh | sh"
          />
        </Step>

        <Step n="03" title="Pick a model that fits">
          <p>
            Open the Models page. Tap the memory chip that matches your machine. A 4GB chip lists
            models that fit in 4GB. 48GB+ lists the largest weights. Read the licence before you
            download.
          </p>
        </Step>

        <Step n="04" title="Copy the command and start chatting">
          <p>
            Copy the run command, paste it in a terminal, and wait for the download. When the
            prompt appears, type a message and press enter.
          </p>
          <CodeBlock label="Example" code={EXAMPLE} />
        </Step>
      </ol>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight">Troubleshooting</h2>
        <div className="mt-6 flex flex-col gap-3">
          <Trouble
            title="Too slow"
            body="Close other apps, pick a smaller quant, or move to a model with a lower RAM number. CPU runs of large models feel stuck even when they are working."
          />
          <Trouble
            title="Out of memory"
            body="The process was bigger than your RAM or VRAM. Go back to Models and choose a lower memory chip. Q4_K_M is the default in these commands. A smaller quant tag uses less memory and more quality is lost."
          />
          <Trouble
            title="Model not found"
            body="Check the command for a typo, update Ollama, and confirm you are online for the first download. If the repo was renamed, open View on Hugging Face and copy the new id into models.json."
          />
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight">FAQ</h2>
        <Accordion.Root type="single" collapsible className="mt-6 flex flex-col gap-3">
          {FAQS.map((item) => (
            <Accordion.Item
              key={item.q}
              value={item.q}
              className="overflow-hidden rounded-2xl border border-line bg-surface"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-base font-medium text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  {item.q}
                  <ChevronDown className="size-4 shrink-0 text-muted transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-4 pb-4 text-sm leading-6 text-muted">
                {item.a}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </section>
    </main>
  );
}

function Step({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <li className="grid grid-cols-[auto_1fr] gap-4">
      <span className="font-mono text-sm font-medium text-primary">{n}</span>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        <div className="flex flex-col gap-4 text-sm leading-6 text-muted">{children}</div>
      </div>
    </li>
  );
}

function Trouble({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-2xl border border-line bg-surface p-4">
      <h3 className="font-medium text-fg">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
    </article>
  );
}
