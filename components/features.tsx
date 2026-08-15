import { Card } from "@/components/ui/card";
import { Code2, FolderOpen, Search, Share2 } from "lucide-react";

export default function Features() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-muted-foreground max-w-4xl text-balance text-4xl font-medium tracking-tight lg:text-5xl">
          <span className="text-foreground">Everything a developer needs.</span>{" "}
          <br /> Built for how you actually think and write.
        </h2>
        <div className="*:bg-background mt-8 grid gap-3 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-8 dark:bg-transparent">
            <p className="text-muted-foreground max-w-xs text-lg font-medium">
              <span className="text-foreground">Full Markdown support.</span>{" "}
              Write with the syntax you already know — headings, lists,
              blockquotes, tables, and more.
            </p>

            <div className="my-16">
              <div
                aria-hidden
                className="relative mx-auto aspect-square w-10/12"
              >
                <div className="mask-b-from-75% absolute inset-0">
                  <div className="bg-background h-full rounded-xl border"></div>
                </div>
                <div className="bg-card ring-foreground/6.5 absolute bottom-0 right-0 aspect-square w-3/5 translate-x-8 translate-y-16 rounded-xl shadow-xl shadow-black/5 ring" />
              </div>
            </div>
          </Card>
          <Card className="p-8 dark:bg-transparent">
            <p className="text-muted-foreground max-w-xs text-lg font-medium">
              <span className="text-foreground">
                Code snippets with syntax highlighting.
              </span>{" "}
              Paste and display code in any language — beautifully formatted
              every time.
            </p>

            <div className="mask-x-from-65% relative mt-6 pt-2">
              <div
                aria-hidden
                className="bg-linear-to-b from-card to background ring-foreground/6.5 relative h-72 rounded-xl shadow-xl ring"
              ></div>
            </div>
          </Card>
          <Card className="p-8 dark:bg-transparent">
            <p className="text-muted-foreground max-w-xs text-lg font-medium">
              <span className="text-foreground">Organized your way.</span> Use
              notebooks, tags, and folders to keep every project, idea, and
              reference exactly where you expect it.
            </p>

            <div className="mask-b-from-75% mt-16">
              <div
                aria-hidden
                className="bg-background relative mx-auto flex aspect-square flex-col justify-between rounded-xl border pb-6"
              >
                <div className="flex gap-1 border-b p-3">
                  <div className="bg-foreground/10 size-1 rounded-full"></div>
                  <div className="bg-foreground/10 size-1 rounded-full"></div>
                  <div className="bg-foreground/10 size-1 rounded-full"></div>
                </div>

                <div className="bg-card ring-foreground/6.5 mx-6 mt-auto aspect-video rounded-xl shadow-xl ring" />
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 border border-border dark:bg-background bg-muted rounded-none divide-y md:divide-y-0 md:divide-x divide-border">
          <div className="p-6 flex flex-col justify-between">
            <div>
              <Code2 className="size-6 text-foreground mb-3" />
              <h3 className="text-foreground font-semibold text-base mb-1">
                Code-first editor
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Inline code, fenced blocks, and syntax highlighting out of the
                box.
              </p>
            </div>
          </div>
          <div className="p-6 flex flex-col justify-between">
            <div>
              <FolderOpen className="size-6 text-foreground mb-3" />
              <h3 className="text-foreground font-semibold text-base mb-1">
                Smart organization
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Notebooks, tags, and pinned notes keep your knowledge
                structured.
              </p>
            </div>
          </div>
          <div className="p-6 flex flex-col justify-between">
            <div>
              <Search className="size-6 text-foreground mb-3" />
              <h3 className="text-foreground font-semibold text-base mb-1">
                Instant search
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Find any note, snippet, or tag across your entire workspace in
                milliseconds.
              </p>
            </div>
          </div>
          <div className="p-6 flex flex-col justify-between">
            <div>
              <Share2 className="size-6 text-foreground mb-3" />
              <h3 className="text-foreground font-semibold text-base mb-1">
                Easy sharing
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Share notes with teammates or publish them as public links with
                one click.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
