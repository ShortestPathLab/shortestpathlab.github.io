import type { Publication } from "@content/getPublications";
import { CardBase } from "./Card";
import download from "downloadjs";
import { slugifyStr } from "@utils/slugify";
import Tag from "./Tag";

export function CardPublication({ pub }: { pub?: Publication }) {
  return (
    <>
      <CardBase
        id={slugifyStr(pub?.title ?? "")}
        slug={pub?.title}
        primary={`${pub?.year} / ${pub?.title}`}
        secondary={
          <>
            {!!pub?.tags?.length && (
              <ul className="-mt-2 mb-1">
                {pub?.tags?.map?.(tag => <Tag tag={slugifyStr(tag)} />)}
              </ul>
            )}
            <span
              className="break-all text-sm font-medium sm:break-normal"
              dangerouslySetInnerHTML={{ __html: pub?.formatted ?? "" }}
            />
          </>
        }
        description={
          <div className="flex flex-row gap-4 pt-2">
            <button
              className="text-skin-accent"
              onClick={() =>
                download(
                  pub?.bibtex ?? "",
                  "citation.bib",
                  "application/x-bibtex"
                )
              }
            >
              Bibtex
            </button>
            <a
              className={
                pub?.url ? "text-skin-accent" : "pointer-events-none opacity-50"
              }
              href={pub?.url}
            >
              Publisher
            </a>
            <a
              className={
                pub?.pdf ? "text-skin-accent" : "pointer-events-none opacity-50"
              }
              href={pub?.pdf}
            >
              PDF
            </a>
          </div>
        }
      />
    </>
  );
}
